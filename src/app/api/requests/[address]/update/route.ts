import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';

interface SensorUpdate {
    temperature_x_100: number;
    humidity_x_100: number;
    vibrations_x_100: number;
    X: number;
    Y: number;
    Z: number;
    signature: number;
}

export async function POST(
    request: Request,
    context: any
) {
    try {
        const { address } = await context.params;
        const data: SensorUpdate = await request.json();

        const updatedRequest = mockDb.addSensorData(address, { ...data, X: data.X / 100, Y: data.Y / 100, Z: data.Z / 100 });

        if (!updatedRequest) {
            return NextResponse.json(
                { success: false, message: 'Request not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            address,
            data: updatedRequest
        });

    } catch (error) {
        console.error('Error processing sensor update:', error);
        return NextResponse.json(
            { success: false, message: 'Invalid update data' },
            { status: 400 }
        );
    }
} 