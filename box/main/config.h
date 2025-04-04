// config.h - Configuration settings

#ifndef CONFIG_H
#define CONFIG_H

// === Wi-Fi Credentials 2.4Ghz ===
const char* ssid = "ThunderHorn";
const char* password = "ethglobal.com";

// === Server Configuration ===

const String serverUrl = "https://vector.0xshazam.xyz/";  // Complete URL for ping
const char* SERVER_HOST = "vector.0xshazam.xyz";  // Just the hostname without https:// or path
const String serverEndpoint = "https://vector.0xshazam.xyz/api/requests/0x1234567890123456789012345678901234567890/update";
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
