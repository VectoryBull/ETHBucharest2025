// crypto.h - Cryptographic functions

#ifndef CRYPTO_H
#define CRYPTO_H

#include "config.h"

// Modular exponentiation for RSA signing
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

// Create RSA signature for sensor data
long long signData(int t_scaled, int h_scaled, int vib_scaled, int gyroSum) {
  // Create a simple hash by summing all integer values
  int hash = t_scaled + h_scaled + vib_scaled + gyroSum;

  // RSA Sign: signedHash = (hash ^ d) % n
  long long hash_ll = (long long)hash;
  long long signedHash = mod_exp(hash_ll, RSA_PRIVATE_KEY, RSA_MODULUS);
  
  return signedHash;
}

#endif
