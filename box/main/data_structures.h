// data_structures.h - Data structures and buffer management

#ifndef DATA_STRUCTURES_H
#define DATA_STRUCTURES_H

#include "config.h"

// Sensor data structure for transmission and buffering
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

// Buffer for storing data when offline
SensorData dataBuffer[MAX_BUFFER_SIZE];
int bufferIndex = 0;
// Count valid entries in buffer
int countBufferedData() {
  int count = 0;
  for (int i = 0; i < MAX_BUFFER_SIZE; i++) {
    if (dataBuffer[i].valid) count++;
  }
  return count;
}

// Initialize the data buffer
void initializeBuffer() {
  for (int i = 0; i < MAX_BUFFER_SIZE; i++) {
    dataBuffer[i].valid = false;
  }
}

// Add sensor data to buffer
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


#endif
