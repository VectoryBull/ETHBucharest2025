// sensors.h - Sensor reading and management

#ifndef SENSORS_H
#define SENSORS_H

#include "DHT.h"
#include "config.h"

// DHT sensor instance
DHT dht(DHTPIN, DHTTYPE);

// Previous sensor values for change detection
int prevX = -1, prevY = -1, prevZ = -1;
float prevTemp = -1000.0, prevHumidity = -1.0;
float prevVibrations = -1.0;

// Initialize all sensors
void initializeSensors() {
  pinMode(X_AXIS, INPUT);
  pinMode(Y_AXIS, INPUT);
  pinMode(Z_AXIS, INPUT);
  pinMode(SHAKE_PIN, INPUT_PULLUP);
  
  dht.begin();
}

// Detect vibrations over a time window
float readVibrations(int timeWindow = 200) {
  int vibrationChanges = 0;
  int lastShakeState = digitalRead(SHAKE_PIN);

  unsigned long startTime = millis();
  while (millis() - startTime < timeWindow) {
    int currentShakeState = digitalRead(SHAKE_PIN);
    if (currentShakeState != lastShakeState) {
      vibrationChanges++;
      lastShakeState = currentShakeState;
    }
    delay(1);
  }

  // Convert to vibrations per second
  float vibrationsPerSecond = vibrationChanges * (1000.0 / timeWindow);
  return vibrationsPerSecond;
}

// Check if sensor values have changed enough to report
bool haveReadingsChanged(int xVal, int yVal, int zVal, float temperature, float humidity, float vibrations) {
  if (xVal != prevX || yVal != prevY || zVal != prevZ) return true;
  if (!isnan(temperature) && abs(temperature - prevTemp) > 0.1) return true;
  if (!isnan(humidity) && abs(humidity - prevHumidity) > 0.1) return true;
  if (abs(vibrations - prevVibrations) > 0.1) return true;
  
  return false;
}

// Update previous readings
void updatePreviousReadings(int xVal, int yVal, int zVal, float temperature, float humidity, float vibrations) {
  prevX = xVal;
  prevY = yVal;
  prevZ = zVal;
  prevTemp = temperature;
  prevHumidity = humidity;
  prevVibrations = vibrations;
}

// Debug print sensor values
void printSensorValues(int xVal, int yVal, int zVal, float temperature, float humidity, float vibrations, long long signature, bool isConnected) {
  int t_scaled = isnan(temperature) ? 0 : (int)(temperature * 100);
  int h_scaled = isnan(humidity) ? 0 : (int)(humidity * 100);
  int vib_scaled = (int)(vibrations * 100);
  int gyroSum = xVal + yVal + zVal;
  
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
  Serial.print(" | Signed Hash: "); Serial.println(signature);
  Serial.print(" | Connection: "); Serial.println(isConnected ? "Online" : "Offline");
  Serial.print(" | Buffered Data: "); Serial.println(countBufferedData());
  Serial.println("==================");
}

#endif
