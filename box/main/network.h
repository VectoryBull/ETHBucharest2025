// network.h - Network connectivity and data transmission

#ifndef NETWORK_H
#define NETWORK_H

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include "config.h"
#include "data_structures.h"
#include "led_control.h"

// Global connection status
bool isConnected = false;
unsigned long lastPingTime = 0;
unsigned long lastDataSendAttempt = 0;
const unsigned long MIN_SEND_INTERVAL = 10; // Reduced minimum ms between send attempts

// Persistent client objects - create once, reuse many times
WiFiClientSecure persistentClient;
HTTPClient persistentHttp;
bool clientInitialized = false;

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
    
    // Initialize the persistent client just once
    if (!clientInitialized) {
      persistentClient.setInsecure(); // Skip certificate verification
      clientInitialized = true;
    }
  } else {
    Serial.println("\nWi-Fi connection failed!");
    isConnected = false;
  }

  delay(100);
}

// Initialize HTTP client for reuse
void initHttp() {
  persistentHttp.begin(persistentClient, serverEndpoint);
  persistentHttp.addHeader("Content-Type", "application/json");
  persistentHttp.setTimeout(10); // Short timeout to prevent blocking
}

// Fast, fire-and-forget data send - doesn't wait for response
void sendDataToServerNoBlock(SensorData data) {
  if (!isConnected || WiFi.status() != WL_CONNECTED) return;

  // Only initialize if needed
  if (!clientInitialized) {
    persistentClient.setInsecure();
    clientInitialized = true;
  }

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

  // Fire and forget HTTP request - reusing the persistent connection
  persistentHttp.begin(persistentClient, serverEndpoint);
  persistentHttp.addHeader("Content-Type", "application/json");
  persistentHttp.setTimeout(500);
  
  // Just send it without waiting for the response
  persistentHttp.sendRequest("POST", jsonString);
  
  // Don't end or delete - connection is reused
}

// Send all buffered data without blocking
void sendBufferedDataNoBlock() {
  if (!isConnected || WiFi.status() != WL_CONNECTED) return;

  // Rate limit our sends to not overwhelm WiFi
  unsigned long currentMillis = millis();
  if (currentMillis - lastDataSendAttempt < MIN_SEND_INTERVAL) {
    return;
  }
  lastDataSendAttempt = currentMillis;

  // Find next valid data point
  bool foundValid = false;
  for (int i = 0; i < MAX_BUFFER_SIZE; i++) {
    // Scan through buffer from current position
    int currentIndex = (bufferIndex + i) % MAX_BUFFER_SIZE;
    
    if (dataBuffer[currentIndex].valid) {
      // Found a valid entry, send it
      sendDataToServerNoBlock(dataBuffer[currentIndex]);
      
      // Mark as sent
      dataBuffer[currentIndex].valid = false;
      
      // Update buffer index for next time
      bufferIndex = (currentIndex + 1) % MAX_BUFFER_SIZE;
      
      foundValid = true;
      break; // Only send one per call to maintain responsiveness
    }
  }
  
  // If nothing found valid, reset index
  if (!foundValid) {
    bufferIndex = 0;
  }
}

// Count how many valid entries are in the buffer

// Add a data point to the buffer

// Quick connection check - just verify WiFi is connected
bool checkWiFiConnection() {
  if (WiFi.status() != WL_CONNECTED) {
    isConnected = false;
    return false;
  }
  
  isConnected = true;
  return true;
}

// This function can be called frequently in your main loop
// It will attempt one buffer send operation without blocking
void processNetworkQueue() {
  // First verify we're connected
  if (checkWiFiConnection()) {
    // If we have buffered data, try to send the next item
    if (countBufferedData() > 0) {
      sendBufferedDataNoBlock();
    }
  }
}

#endif