import { ethers } from 'ethers';
import { NextResponse } from 'next/server';
import { IoTProcessorABI } from '@/contracts/IoTProcessor';
import { mockDb } from '@/lib/mockDb';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ address: string }> }
) {
    try {
        const { address } = await params;
        const data = await request.json();

        // Update mock DB with the new sensor data
        const mockData = {
            temperature_x_100: data.temperature || 1,
            humidity_x_100: data.humidity || 1,
            vibrations_x_100: data.vibration1 || 1,
            X: data.gyro || 1,
            Y: data.lat || 1,
            Z: data.lng || 1,
            signature: data.signature || 3086
        };

        // Update the mock database
        const updatedRequest = mockDb.addSensorData(address, mockData);
        if (!updatedRequest) {
            return NextResponse.json({ error: 'Request not found' }, { status: 404 });
        }

        // Use direct RPC URL with fetch configuration
        const provider = new ethers.providers.JsonRpcProvider({
            url: process.env.NEXT_PUBLIC_RPC_URL!,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            skipFetchSetup: true
        }, {
            chainId: 421614,
            name: 'arbitrum-sepolia'
        });

        const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
        const contract = new ethers.Contract(address, IoTProcessorABI, signer);

        // Send transaction to the smart contract
        console.log(data)
        const tx = await contract.storeSensorData(
            ethers.BigNumber.from(data.temperature || 1),
            ethers.BigNumber.from(data.humidity || 1),
            ethers.BigNumber.from(data.vibration1 || 1),
            ethers.BigNumber.from(data.vibration2 || 1),
            ethers.BigNumber.from(data.gyro || 1),
            ethers.BigNumber.from(data.lat || 1),
            ethers.BigNumber.from(data.lng || 1),
            ethers.BigNumber.from(data.signature || 3086)
        );

        const receipt = await tx.wait();

        return NextResponse.json({
            success: true,
            transactionHash: receipt.transactionHash,
            blockNumber: receipt.blockNumber,
            updatedRequest
        });

    } catch (error: any) {
        console.error('Error updating sensor data:', error);
        return NextResponse.json({
            error: 'Failed to update sensor data',
            details: error.message || String(error)
        }, { status: 500 });
    }
} 