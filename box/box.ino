#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include "DHT.h"

// === Wi-Fi Credentials ===
const char* ssid = "<YOUR_SSID_HERE>";
const char* password = "<PASSWORD>";

// === Server Configuration ===
const char* serverUrl = "<SERVER_URL>";
const int pingInterval = 30000; // 30 seconds between connectivity checks
unsigned long lastPingTime = 0;

// === Pin Definitions ===
#define DHTPIN   D1
#define DHTTYPE  DHT11
const int SHAKE_PIN = D2;
const int X_AXIS    = D7;
const int Y_AXIS    = D5;
const int Z_AXIS    = D6;
const int RED_LED   = D0;
const int GREEN_LED = D3;
const int BLUE_LED  = D4;

// === Global Variables ===
int state = 0;
DHT dht(DHTPIN, DHTTYPE);
bool isConnected = false;

// Previous sensor values
int prevX = -1, prevY = -1, prevZ = -1;
float prevTemp = -1000.0, prevHumidity = -1.0;
float prevVibrations = -1.0;

// Buffer for storing data when offline
const int MAX_BUFFER_SIZE = 50;
struct SensorData {
  int temperature_x_100;
  int humidity_x_100;
  int vibrations_x_100;
  int X;
  int Y;
  int Z;
  long long signature;
  bool valid;
};
SensorData dataBuffer[MAX_BUFFER_SIZE];
int bufferIndex = 0;

// === Modular Exponentiation for RSA ===
long long mod_exp(long long base, long long exp, long long mod) {
  if (mod == 1) return 0;

  long long result = 1;
  base = base % mod;

  while (exp > 0) {
    if (exp & 1) {
      result = (result * base) % mod;
    }
    base = (base * base) % mod;
    exp >>= 1;
  }

  return result;
}

void setup() {
  Serial.begin(9600);

  pinMode(X_AXIS, INPUT);
  pinMode(Y_AXIS, INPUT);
  pinMode(Z_AXIS, INPUT);
  pinMode(SHAKE_PIN, INPUT_PULLUP);

  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(BLUE_LED, OUTPUT);

  analogWriteRange(255); // Set PWM range to full 8-bit

  analogWrite(RED_LED, 0);
  analogWrite(GREEN_LED, 0);
  analogWrite(BLUE_LED, 0);

  dht.begin();

  // Initialize buffer
  for (int i = 0; i < MAX_BUFFER_SIZE; i++) {
    dataBuffer[i].valid = false;
  }

  // === Wi-Fi Connection ===
  state = 1;  // Connecting to Wi-Fi
  updateLED(state);

  connectWiFi();
}

void loop() {
  // Check connectivity periodically
  if (millis() - lastPingTime > pingInterval) {
    checkConnectivity();
    lastPingTime = millis();
  }

  // === Vibration Detection (200ms window) ===
  int vibrationChanges = 0;
  int lastShakeState = digitalRead(SHAKE_PIN);

  unsigned long startTime = millis();
  while (millis() - startTime < 200) {
    int currentShakeState = digitalRead(SHAKE_PIN);
    if (currentShakeState != lastShakeState) {
      vibrationChanges++;
      lastShakeState = currentShakeState;
    }
    delay(1);
  }

  float vibrationsPerSecond = vibrationChanges * 5.0;

  // === Sensor Readings ===
  int xVal = digitalRead(X_AXIS);
  int yVal = digitalRead(Y_AXIS);
  int zVal = digitalRead(Z_AXIS);
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();  // Celsius

  // === Check if any value changed ===
  bool hasChanged = false;
  if (xVal != prevX || yVal != prevY || zVal != prevZ) hasChanged = true;
  if (!isnan(temperature) && abs(temperature - prevTemp) > 0.1) hasChanged = true;
  if (!isnan(humidity) && abs(humidity - prevHumidity) > 0.1) hasChanged = true;
  if (abs(vibrationsPerSecond - prevVibrations) > 0.1) hasChanged = true;

  if (hasChanged) {
    // === Convert all values to integers ===
    int t_scaled = isnan(temperature) ? 0 : (int)(temperature * 100);
    int h_scaled = isnan(humidity) ? 0 : (int)(humidity * 100);
    int vib_scaled = (int)(vibrationsPerSecond * 100);
    int gyroSum = xVal + yVal + zVal;

    // Create a simple hash by summing all integer values
    int hash = t_scaled + h_scaled + vib_scaled + gyroSum;

    // RSA Sign: signedHash = (hash ^ d) % n
    // Using your provided private key
    long long d = 413;  // Your private key exponent
    long long n = 3233;   // Modulus
    long long hash_ll = (long long)hash;
    long long signedHash = mod_exp(hash_ll, d, n);

    // === Transmitting Data ===
    blinkGreen();  // Blink green LED fast

    // Prepare data for sending/buffering
    SensorData currentData;
    currentData.temperature_x_100 = t_scaled;
    currentData.humidity_x_100 = h_scaled;
    currentData.vibrations_x_100 = vib_scaled;
    currentData.X = xVal;
    currentData.Y = yVal;
    currentData.Z = zVal;
    currentData.signature = signedHash;
    currentData.valid = true;

    // Send data immediately if connected, otherwise buffer it
    if (isConnected) {
      sendDataToServer(currentData);

      // Try to send any buffered data
      sendBufferedData();
    } else {
      // Buffer the data
      addToBuffer(currentData);
    }

    Serial.println("=== [TRANSMIT] ===");
    Serial.print("X: "); Serial.print(xVal);
    Serial.print(" | Y: "); Serial.print(yVal);
    Serial.print(" | Z: "); Serial.print(zVal);

    if (isnan(humidity) || isnan(temperature)) {
      Serial.print(" | DHT11 error");
    } else {
      Serial.print(" | Humidity*100: "); Serial.print(h_scaled);
      Serial.print(" | Temp*100: "); Serial.print(t_scaled);
    }

    Serial.print(" | Vib*100: "); Serial.print(vib_scaled);
    Serial.print(" | Gyro Sum: "); Serial.print(gyroSum);
    Serial.print(" | Hash: "); Serial.print(hash);
    Serial.print(" | Signed Hash: "); Serial.println(signedHash);
    Serial.print(" | Connection: "); Serial.println(isConnected ? "Online" : "Offline");
    Serial.print(" | Buffered Data: "); Serial.println(countBufferedData());
    Serial.println("==================");

    // Save current values
    prevX = xVal;
    prevY = yVal;
    prevZ = zVal;
    prevTemp = temperature;
    prevHumidity = humidity;
    prevVibrations = vibrationsPerSecond;


  }

  // Update LED based on connection state
  state = isConnected ? 2 : 3;
  updateLED(state);

  delay(100);
}

void connectWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    analogWrite(RED_LED, 0);
    analogWrite(GREEN_LED, 0);
    analogWrite(BLUE_LED, 64);  // Dim blue
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWi-Fi connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    isConnected = true;
    state = 2;  // Wi-Fi OK
  } else {
    Serial.println("\nWi-Fi connection failed!");
    isConnected = false;
    state = 3;  // Offline mode
  }

  updateLED(state);
  delay(100);
}

void checkConnectivity() {
  // Check WiFi connection first
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected, attempting to reconnect...");
    isConnected = false;
    connectWiFi();
    return;
  }

  // Try to ping the server
  WiFiClient client;
  HTTPClient http;

  Serial.print("Pinging server... ");

  http.begin(client, serverUrl);
  int httpCode = http.GET();

  if (httpCode > 0) {
    Serial.println("Server reachable, HTTP code: " + String(httpCode));
    isConnected = true;

    // Try to send any buffered data
    if (countBufferedData() > 0) {
      sendBufferedData();
    }
  } else {
    Serial.println("Server unreachable, error: " + http.errorToString(httpCode));
    isConnected = false;
  }

  http.end();
}

void sendDataToServer(SensorData data) {
  if (!isConnected) return;

  WiFiClient client;
  HTTPClient http;

  Serial.println("Sending data to server...");

  http.begin(client, serverUrl);
  http.addHeader("Content-Type", "application/json");

  // Create JSON document
  StaticJsonDocument<300> jsonDoc;
  jsonDoc["temperature_x_100"] = data.temperature_x_100;
  jsonDoc["humidity_x_100"] = data.humidity_x_100;
  jsonDoc["vibrations_x_100"] = data.vibrations_x_100;
  jsonDoc["X"] = data.X;
  jsonDoc["Y"] = data.Y;
  jsonDoc["Z"] = data.Z;
  jsonDoc["signature"] = data.signature;

  String jsonString;
  serializeJson(jsonDoc, jsonString);

  // For now, just print the JSON data that would be sent
  Serial.println("JSON payload: " + jsonString);

  // Uncomment to actually send the data
  /*
  int httpCode = http.POST(jsonString);

  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println("Server response code: " + String(httpCode));
    Serial.println("Server response: " + payload);
  } else {
    Serial.println("Error sending data: " + http.errorToString(httpCode));
    isConnected = false;  // Mark as disconnected
  }

  http.end();
  */
}


void addToBuffer(SensorData data) {
  if (bufferIndex >= MAX_BUFFER_SIZE) {
    // Buffer is full, shift all elements down to make room
    for (int i = 0; i < MAX_BUFFER_SIZE - 1; i++) {
      dataBuffer[i] = dataBuffer[i + 1];
    }
    bufferIndex = MAX_BUFFER_SIZE - 1;
  }

  // Add new data to buffer
  dataBuffer[bufferIndex] = data;
  bufferIndex++;

  Serial.print("Data buffered. Buffer contains ");
  Serial.print(countBufferedData());
  Serial.println(" records.");
}

int countBufferedData() {
  int count = 0;
  for (int i = 0; i < MAX_BUFFER_SIZE; i++) {
    if (dataBuffer[i].valid) count++;
  }
  return count;
}

void sendBufferedData() {
  if (!isConnected) return;

  Serial.println("Attempting to send buffered data...");

  int sent = 0;
  for (int i = 0; i < MAX_BUFFER_SIZE; i++) {
    if (dataBuffer[i].valid) {
      sendDataToServer(dataBuffer[i]);
      dataBuffer[i].valid = false;
      sent++;
      delay(10);
    }
  }


  if (countBufferedData() == 0) {
    bufferIndex = 0;
  }

  Serial.print("Sent ");
  Serial.print(sent);
  Serial.println(" buffered records.");
}

void updateLED(int s) {
  switch (s) {
    case 0:  // Initial
      analogWrite(RED_LED, 0);
      analogWrite(GREEN_LED, 0);
      analogWrite(BLUE_LED, 0);
      break;
    case 1:  // Connecting to Wi-Fi
      analogWrite(RED_LED, 0);
      analogWrite(GREEN_LED, 0);
      analogWrite(BLUE_LED, 64);  // Dim blue
      break;
    case 2:  // Online (steady green)
      analogWrite(RED_LED, 0);
      analogWrite(GREEN_LED, 64); // Dim green
      analogWrite(BLUE_LED, 0);
      break;
    case 3:  // Offline (steady red)
      analogWrite(RED_LED, 64);   // Dim red
      analogWrite(GREEN_LED, 0);
      analogWrite(BLUE_LED, 0);
      break;
  }
}

void blinkGreen() {
  for (int i = 0; i < 3; i++) {
    analogWrite(GREEN_LED, 0);
    delay(100);
    analogWrite(GREEN_LED, 64);
    delay(100);
  }
}