import { NextResponse } from 'next/server';
import type { Request as DeliveryRequest } from '@/types/request';

const requests: DeliveryRequest[] = [
    {
        address: '0x1234567890123456789012345678901234567890',
        type: 'Vehicle',
        status: 'Pending',
        pickup: 'New York, NY',
        delivery: 'Los Angeles, CA',
        weight: '2500kg',
        temperature: '15-25°C',
        deadline: '2024-02-15',
        amount: '$2500',
        created: 1707936000000, // 2024-02-14
        lastUpdated: 1707936000000
    },
    {
        address: '0x2345678901234567890123456789012345678901',
        type: 'Electronics',
        status: 'Accepted',
        pickup: 'Miami, FL',
        delivery: 'Chicago, IL',
        weight: '500kg',
        temperature: '10-20°C',
        deadline: '2024-02-20',
        amount: '$1800',
        created: 1707849600000, // 2024-02-13
        lastUpdated: 1707936000000
    },
    {
        address: '0x3456789012345678901234567890123456789012',
        type: 'Food',
        status: 'In Transit',
        pickup: 'Seattle, WA',
        delivery: 'Portland, OR',
        weight: '1000kg',
        temperature: '2-8°C',
        deadline: '2024-02-16',
        amount: '$1200',
        created: 1707762400000,
        lastUpdated: 1707936000000
    },
    {
        address: '0x4567890123456789012345678901234567890123',
        type: 'Electronics',
        status: 'Delivered',
        pickup: 'Boston, MA',
        delivery: 'Washington, DC',
        weight: '300kg',
        temperature: '15-25°C',
        deadline: '2024-02-14',
        amount: '$900',
        created: 1707676800000,
        lastUpdated: 1707936000000
    },
    {
        address: '0x5678901234567890123456789012345678901234',
        type: 'Vehicle',
        status: 'Pending',
        pickup: 'Houston, TX',
        delivery: 'Phoenix, AZ',
        weight: '1800kg',
        temperature: '15-35°C',
        deadline: '2024-02-18',
        amount: '$2200',
        created: 1707936000000,
        lastUpdated: 1707936000000
    },
    {
        address: '0x6789012345678901234567890123456789012345',
        type: 'Food',
        status: 'In Transit',
        pickup: 'San Francisco, CA',
        delivery: 'Las Vegas, NV',
        weight: '800kg',
        temperature: '0-4°C',
        deadline: '2024-02-17',
        amount: '$1500',
        created: 1707849600000,
        lastUpdated: 1707936000000
    },
    {
        address: '0x7890123456789012345678901234567890123456',
        type: 'Electronics',
        status: 'Accepted',
        pickup: 'Denver, CO',
        delivery: 'Salt Lake City, UT',
        weight: '400kg',
        temperature: '15-25°C',
        deadline: '2024-02-19',
        amount: '$1100',
        created: 1707936000000,
        lastUpdated: 1707936000000
    },
    {
        address: '0x8901234567890123456789012345678901234567',
        type: 'Other',
        status: 'Pending',
        pickup: 'Atlanta, GA',
        delivery: 'Miami, FL',
        weight: '1200kg',
        temperature: '15-30°C',
        deadline: '2024-02-21',
        amount: '$1700',
        created: 1707936000000,
        lastUpdated: 1707936000000
    },
    {
        address: '0x9012345678901234567890123456789012345678',
        type: 'Vehicle',
        status: 'In Transit',
        pickup: 'Dallas, TX',
        delivery: 'San Antonio, TX',
        weight: '2200kg',
        temperature: '15-35°C',
        deadline: '2024-02-16',
        amount: '$1900',
        created: 1707849600000,
        lastUpdated: 1707936000000
    },
    {
        address: '0x0123456789012345678901234567890123456789',
        type: 'Food',
        status: 'Accepted',
        pickup: 'Philadelphia, PA',
        delivery: 'Pittsburgh, PA',
        weight: '600kg',
        temperature: '2-8°C',
        deadline: '2024-02-18',
        amount: '$1300',
        created: 1707936000000,
        lastUpdated: 1707936000000
    }
];

export const dynamic = 'force-dynamic';

export async function GET() {
    const summaries = requests.map(req => ({
        address: req.address,
        type: req.type,
        status: req.status,
        delivery: req.delivery,
        deadline: req.deadline,
        amount: req.amount
    }));

    return NextResponse.json(summaries);
} 