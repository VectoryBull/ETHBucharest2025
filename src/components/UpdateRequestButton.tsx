'use client';

import { useState } from 'react';

interface Props {
    address: string;
}

// Simple RSA encryption function
function encrypt(message: number, publicKey: [number, number]): number {
    const [e, n] = publicKey;
    const cipher = modPow(BigInt(message), BigInt(e), BigInt(n));
    return Number(cipher);
}

function decrypt(cipher: number, privateKey: [number, number]): number {
    const [d, n] = privateKey;
    const message = modPow(BigInt(cipher), BigInt(d), BigInt(n));
    return Number(message);
}

// Modular exponentiation: (base^exponent) % modulus
function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
    if (modulus === BigInt(1)) return BigInt(0);
    let result = BigInt(1);
    base = base % modulus;
    while (exponent > BigInt(0)) {
        if (exponent % BigInt(2) === BigInt(1)) {
            result = (result * base) % modulus;
        }
        exponent = exponent / BigInt(2);
        base = (base * base) % modulus;
    }
    return result;
}


export default function UpdateRequestButton({ address }: Props) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            // Generate sensor data with smaller numbers
            const sensorData = {
                temperature: Math.floor(Math.random() * 30) + 15,  // 15-45
                humidity: Math.floor(Math.random() * 50) + 30,     // 30-80
                vibration1: Math.floor(Math.random() * 10),        // 0-10
                vibration2: Math.floor(Math.random() * 10),        // 0-10
                gyro: Math.floor(Math.random() * 10),              // 0-10
                lat: Math.floor(Math.random() * 90) + 1,           // 1-90
                lng: Math.floor(Math.random() * 180) - 90,         // -90-90
            };

            // Using known working values
            const message = sensorData.temperature + sensorData.humidity + sensorData.vibration1 + sensorData.vibration2 + sensorData.gyro;
            const signature = encrypt(message, [65537, 3233]); // Should give us 2297

            console.log('Sending sensor data:', { ...sensorData, signature });

            const response = await fetch(`/api/requests/${address}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...sensorData,
                    signature
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update sensor data');
            }

            window.location.reload();

        } catch (error) {
            console.error('Error updating sensor data:', error);
            alert('Failed to update sensor data');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
            {isUpdating ? 'Updating...' : 'Update Sensor Data'}
        </button>
    );
} 