// network.h - Network connectivity and data transmission

#ifndef NETWORK_H
#define NETWORK_H

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include "config.h"
#include "data_structures.h"
#include "led_control.h"

// Global connection status
bool isConnected = false;
unsigned long lastPingTime = 0;

// Connect to WiFi network
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
  } else {
    Serial.println("\nWi-Fi connection failed!");
    isConnected = false;
  }

  delay(100);
}

// Send a single data record to the server
void sendDataToServer(SensorData data) {
  if (!isConnected) return;

  WiFiClient client;
  HTTPClient http;

  Serial.println("Sending data to server...");

  http.begin(client, serverEndpoint);
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

  // Print the JSON data for debugging
  Serial.println("JSON payload: " + jsonString);

  // Actually send the data
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
}

// Send all buffered data
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

// Check connection to server
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

#endif
