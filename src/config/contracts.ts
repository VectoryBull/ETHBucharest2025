import { IIoTDataProcessor } from '@/types/contracts';

export const CONTRACTS = {
    IOT_PROCESSOR: {
        address: '0x1790c579a6865f2f531506bfc7cc55432592c89a',
        abi: [
            "function init(uint256 min_temp, uint256 max_temp, uint256 max_temp_change, uint256 min_hum, uint256 max_hum, uint256 max_vib1, uint256 max_vib2, uint256 public_key_e, uint256 public_key_n) external",
            "function storeSensorData(uint256 temperature, uint256 humidity, uint256 vibration1, uint256 vibration2, uint256 gyro, uint256 lat, uint256 lng, uint256 signature) external",
            "function isTemperatureWithinBounds(uint256 temperature) external returns (bool)",
            "function isHumidityWithinBounds(uint256 humidity) external returns (bool)",
            "function isVibration1WithinBounds(uint256 vibration1) external returns (bool)",
            "function isVibration2WithinBounds(uint256 vibration2) external returns (bool)",
            "function terminateDataCollection() external",
            "function printTemp(uint256 i) external returns (uint256)",
            "function printFinalState() external returns (uint256)",
            "function encrypt(uint256 message, tuple(uint256,uint256) public_key) external returns (uint256)",
            "function decrypt(uint256 cipher, tuple(uint256,uint256) private_key) external returns (uint256)",
            "function modExp(uint256 base, uint256 exp, uint256 modulus) external returns (uint256)"
        ]
    }
} as const; 