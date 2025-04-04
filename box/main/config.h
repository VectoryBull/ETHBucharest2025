// config.h - Configuration settings

#ifndef CONFIG_H
#define CONFIG_H

// === Wi-Fi Credentials 2.4Ghz ===
const char* ssid = "<YOUR_SSID_HERE>";
const char* password = "<PASSWORD>";

// === Server Configuration ===
const char* serverUrl = "http://192.168.1.143:3000/";
const String serverEndpoint = "http://192.168.1.143:3000/api/requests/0x1234567890123456789012345678901234567890/update";
const int pingInterval = 30000; // 30 seconds between connectivity checks

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

// === Buffer Configuration ===
const int MAX_BUFFER_SIZE = 50;

// === RSA Keys ===
const long long RSA_PRIVATE_KEY = 413;  // Private key exponent
const long long RSA_MODULUS = 3233;     // Modulus

#endif
