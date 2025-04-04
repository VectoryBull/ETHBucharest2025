import { useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';
import { CONTRACTS } from '@/config/contracts';
import { IIoTDataProcessor } from '@/types/contracts';
import { useWalletConnection } from './useWalletConnection';

export function useIoTProcessor() {
    const { isConnected } = useWalletConnection();
    const [contract, setContract] = useState<IIoTDataProcessor | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isConnected || !window.ethereum) return;

        const initContract = async () => {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new Contract(
                    CONTRACTS.IOT_PROCESSOR.address,
                    CONTRACTS.IOT_PROCESSOR.abi,
                    signer
                ) as IIoTDataProcessor;

                setContract(contract);
                setError(null);
            } catch (err) {
                console.error('Error initializing contract:', err);
                setError('Failed to initialize contract');
            } finally {
                setIsLoading(false);
            }
        };

        initContract();
    }, [isConnected]);

    const initializeProcessor = async (
        minTemp: number,
        maxTemp: number,
        maxTempChange: number,
        minHum: number,
        maxHum: number,
        maxVib1: number,
        maxVib2: number,
        publicKeyE: number,
        publicKeyN: number
    ) => {
        if (!contract) throw new Error('Contract not initialized');

        try {
            const tx = await contract.init(
                minTemp,
                maxTemp,
                maxTempChange,
                minHum,
                maxHum,
                maxVib1,
                maxVib2,
                publicKeyE,
                publicKeyN
            );
            await tx.wait();
        } catch (err) {
            console.error('Error initializing processor:', err);
            throw err;
        }
    };

    const storeSensorData = async (
        temperature: number,
        humidity: number,
        vibration1: number,
        vibration2: number,
        gyro: number,
        signature: number,
        lat: number,
        lng: number
    ) => {
        if (!contract) throw new Error('Contract not initialized');

        try {
            const tx = await contract.storeSensorData(
                temperature,
                humidity,
                vibration1,
                vibration2,
                gyro,
                signature,
                lat,
                lng
            );
            await tx.wait();
        } catch (err) {
            console.error('Error storing sensor data:', err);
            throw err;
        }
    };

    return {
        contract,
        isLoading,
        error,
        initializeProcessor,
        storeSensorData
    };
} 