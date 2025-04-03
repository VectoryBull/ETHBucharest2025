import { NextResponse } from 'next/server';
import type { Request as DeliveryRequest } from '@/types/request';

// Rename our mock data type to avoid conflict
const requests: Record<string, DeliveryRequest> = {
    '0x1234567890123456789012345678901234567890': {
        address: '0x1234567890123456789012345678901234567890',
        type: 'Vehicle',
        status: 'Pending',
        pickup: 'New York, NY',
        delivery: 'Los Angeles, CA',
        weight: '2500kg',
        temperature: '15-25°C',
        deadline: '2024-02-15',
        amount: '$2500',
        created: 1707936000000,
        lastUpdated: 1707936000000
    },
    '0x2345678901234567890123456789012345678901': {
        address: '0x2345678901234567890123456789012345678901',
        type: 'Electronics',
        status: 'Accepted',
        pickup: 'Miami, FL',
        delivery: 'Chicago, IL',
        weight: '500kg',
        temperature: '10-20°C',
        deadline: '2024-02-20',
        amount: '$1800',
        created: 1707849600000,
        lastUpdated: 1707936000000
    }
};

export const dynamic = 'force-dynamic';

export async function GET(
    _request: Request,
    context: any
) {
    const { address } = context.params;
    const requestData = requests[address];

    if (!requestData) {
        return NextResponse.json(
            { error: 'Request not found' },
            { status: 404 }
        );
    }

    return NextResponse.json(requestData);
} 