#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include "DHT.h"

// Include all the module headers
#include "config.h"
#include "data_structures.h"
#include "crypto.h"
#include "led_control.h"
#include "network.h"
#include "sensors.h"

// Global state variable
int state = LED_INITIAL;
unsigned long lastConnectivityCheck = 0;
const unsigned long connectivityCheckInterval = 30000; // 30 seconds

void setup() {
  Serial.begin(9600);

  // Initialize components
  initializeLEDs();
  initializeSensors();
  initializeBuffer();

  // Connect to WiFi
  state = LED_CONNECTING;
  updateLED(state);
  connectWiFi();

  // Update state based on connection
  state = isConnected ? LED_ONLINE : LED_OFFLINE;
  updateLED(state);
}
int generateRandomAxisValue() {
  return random(10, 101); // random(min, max) where max is exclusive
}


void loop() {
  // Check connectivity periodically (less frequently)
  unsigned long currentMillis = millis();
  if (currentMillis - lastConnectivityCheck > connectivityCheckInterval) {
    checkWiFiConnection(); // Just a quick check, non-blocking
    lastConnectivityCheck = currentMillis;
  }

  // === Read Sensors ===
  float vibrationsPerSecond = readVibrations(200);
  int xVal = digitalRead(X_AXIS);
  int yVal = digitalRead(Y_AXIS);
  int zVal = digitalRead(Z_AXIS);

  // Replace 1 values with random numbers between 20 and 90
  if (xVal == 1) {
    xVal = generateRandomAxisValue();
  }

  if (yVal == 1) {
    yVal = generateRandomAxisValue();
  }

  if (zVal == 1) {
    zVal = generateRandomAxisValue();
  }
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();  // Celsius

  // Check if any value changed enough to report
  if (haveReadingsChanged(xVal, yVal, zVal, temperature, humidity, vibrationsPerSecond)) {
    // === Convert all values to integers ===
    int t_scaled = isnan(temperature) ? 0 : (int)(temperature * 100);
    int h_scaled = isnan(humidity) ? 0 : (int)(humidity * 100);
    int vib_scaled = (int)(vibrationsPerSecond * 100);
    int gyroSum = xVal + yVal + zVal;

    // Generate digital signature
    long long signedHash = signData(t_scaled, h_scaled, vib_scaled, gyroSum);

    // Visual indicator for data transmission
    blinkGreen();

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

    // Always buffer data - never wait for sending
    addToBuffer(currentData);

    // Debug output
    printSensorValues(xVal, yVal, zVal, temperature, humidity, vibrationsPerSecond, signedHash, isConnected);

    // Save current values for future change detection
    updatePreviousReadings(xVal, yVal, zVal, temperature, humidity, vibrationsPerSecond);
  }

  // Process network queue - this doesn't block
  processNetworkQueue();

  // Update LED based on connection state
  state = isConnected ? LED_ONLINE : LED_OFFLINE;
  updateLED(state);

  // No delay needed - the loop will run continuously
}