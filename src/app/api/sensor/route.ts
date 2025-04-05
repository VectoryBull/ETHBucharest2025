import { ethers } from 'ethers';
import { NextResponse } from 'next/server';
import { IoTProcessorABI } from '@/contracts/IoTProcessor';

// Contract address on Arbitrum Sepolia
const CONTRACT_ADDRESS = '0x...'; // Add your deployed contract address

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate the incoming data
    if (!data.temperature || !data.humidity || !data.vibrations || !data.acceleration || !data.requestId) {
      return NextResponse.json({ error: 'Missing required sensor data' }, { status: 400 });
    }

    // Connect to Arbitrum Sepolia
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, IoTProcessorABI, signer);

    // Format the data for the contract
    const sensorData = {
      temperature: Math.round(data.temperature * 100), // Convert to integer (multiply by 100 for 2 decimal precision)
      humidity: Math.round(data.humidity * 100),
      vibrations: Math.round(data.vibrations * 100),
      accelerationX: Math.round(data.acceleration.x * 100),
      accelerationY: Math.round(data.acceleration.y * 100),
      accelerationZ: Math.round(data.acceleration.z * 100),
      timestamp: Math.floor(Date.now() / 1000) // Unix timestamp in seconds
    };

    // Send transaction to the smart contract
    const tx = await contract.storeSensorData(
      data.requestId,
      sensorData.temperature,
      sensorData.humidity,
      sensorData.vibrations,
      [sensorData.accelerationX, sensorData.accelerationY, sensorData.accelerationZ],
      sensorData.timestamp
    );

    // Wait for transaction confirmation
    const receipt = await tx.wait();

    return NextResponse.json({
      success: true,
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber
    });

  } catch (error) {
    console.error('Error storing sensor data:', error);
    return NextResponse.json({ error: 'Failed to store sensor data' }, { status: 500 });
  }
} 