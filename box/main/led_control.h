// led_control.h - LED indicator functions

#ifndef LED_CONTROL_H
#define LED_CONTROL_H

#include "config.h"

// LED state constants
#define LED_INITIAL     0  // All LEDs off
#define LED_CONNECTING  1  // Dim blue - connecting to WiFi
#define LED_ONLINE      2  // Dim green - online
#define LED_OFFLINE     3  // Dim red - offline

// Update LED status based on state
void updateLED(int state) {
  switch (state) {
    case LED_INITIAL:  // Initial
      analogWrite(RED_LED, 0);
      analogWrite(GREEN_LED, 0);
      analogWrite(BLUE_LED, 0);
      break;
    case LED_CONNECTING:  // Connecting to Wi-Fi
      analogWrite(RED_LED, 0);
      analogWrite(GREEN_LED, 0);
      analogWrite(BLUE_LED, 64);  // Dim blue
      break;
    case LED_ONLINE:  // Online (steady green)
      analogWrite(RED_LED, 0);
      analogWrite(GREEN_LED, 64); // Dim green
      analogWrite(BLUE_LED, 0);
      break;
    case LED_OFFLINE:  // Offline (steady red)
      analogWrite(RED_LED, 64);   // Dim red
      analogWrite(GREEN_LED, 0);
      analogWrite(BLUE_LED, 0);
      break;
  }
}

// Blink green LED for data transmission
void blinkGreen() {
  for (int i = 0; i < 3; i++) {
    analogWrite(GREEN_LED, 0);
    delay(100);
    analogWrite(GREEN_LED, 64);
    delay(100);
  }
}

// Initialize LEDs
void initializeLEDs() {
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(BLUE_LED, OUTPUT);

  analogWriteRange(255); // Set PWM range to full 8-bit

  analogWrite(RED_LED, 0);
  analogWrite(GREEN_LED, 0);
  analogWrite(BLUE_LED, 0);
}

#endif
