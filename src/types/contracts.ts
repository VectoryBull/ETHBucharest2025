import { Contract, ContractTransaction } from 'ethers';

export interface IIoTDataProcessor extends Contract {
    init(
        min_temp: number,
        max_temp: number,
        max_temp_change: number,
        min_hum: number,
        max_hum: number,
        max_vib1: number,
        max_vib2: number,
        public_key_e: number,
        public_key_n: number
    ): Promise<ContractTransaction>;

    storeSensorData(
        temperature: number,
        humidity: number,
        vibration1: number,
        vibration2: number,
        gyro: number,
        signature: number,
        lat: number,
        lng: number
    ): Promise<ContractTransaction>;

    isTemperatureWithinBounds(temperature: number): Promise<boolean>;
    isHumidityWithinBounds(humidity: number): Promise<boolean>;
    isVibration1WithinBounds(vibration1: number): Promise<boolean>;
    isVibration2WithinBounds(vibration2: number): Promise<boolean>;
    
    terminateDataCollection(): Promise<ContractTransaction>;
    printTemp(i: number): Promise<number>;
    printFinalState(): Promise<number>;
    
    encrypt(message: number, public_key: [number, number]): Promise<number>;
    decrypt(cipher: number, private_key: [number, number]): Promise<number>;
    modExp(base: number, exp: number, modulus: number): Promise<number>;
} 