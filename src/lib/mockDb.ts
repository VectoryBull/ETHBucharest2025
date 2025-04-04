import type { Request, RequestWithSensorData } from '@/types/request';

// In-memory storage
let requests: Record<string, RequestWithSensorData> = {
    '0x1234567890123456789012345678901234567890': {
        address: '0x1234567890123456789012345678901234567890',
        type: 'Vehicle',
        status: 'In Transit',
        pickup: 'New York, NY',
        delivery: 'Los Angeles, CA',
        weight: '2500kg',
        temperature: '15-25°C',
        deadline: '2024-02-15',
        amount: '$2500',
        created: 1707936000000,
        lastUpdated: 1707936000000,
        sensorData: {
            temperature: 23.9,
            humidity: 45,
            vibrations: 0.2,
            acceleration: { x: 0.1, y: 0, z: 9.8 },
            timestamp: 1707936000000
        }
    },
    '0x2345678901234567890123456789012345678901': {
        address: '0x2345678901234567890123456789012345678901',
        type: 'Electronics',
        status: 'Pending',
        pickup: 'Miami, FL',
        delivery: 'Chicago, IL',
        weight: '500kg',
        temperature: '10-20°C',
        deadline: '2024-02-20',
        amount: '$1800',
        created: 1707849600000,
        lastUpdated: 1707936000000,
        sensorData: {
            temperature: 23.9,
            humidity: 45,
            vibrations: 0.2,
            acceleration: { x: 0.1, y: 0, z: 9.8 },
            timestamp: 1707936000000
        }
    },
    '0x3456789012345678901234567890123456789012': {
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
        lastUpdated: 1707936000000,
        sensorData: {
            temperature: 5.2,
            humidity: 85,
            vibrations: 0.1,
            acceleration: { x: 0, y: 0.1, z: 9.8 },
            timestamp: 1707936000000
        }
    },
    '0x4567890123456789012345678901234567890123': {
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
        lastUpdated: 1707936000000,
        sensorData: {
            temperature: 23.9,
            humidity: 45,
            vibrations: 0.2,
            acceleration: { x: 0.1, y: 0, z: 9.8 },
            timestamp: 1707936000000
        }
    },
    '0x5678901234567890123456789012345678901234': {
        address: '0x5678901234567890123456789012345678901234',
        type: 'Vehicle',
        status: 'Accepted',
        pickup: 'Houston, TX',
        delivery: 'Phoenix, AZ',
        weight: '1800kg',
        temperature: '15-35°C',
        deadline: '2024-02-18',
        amount: '$2200',
        created: 1707936000000,
        lastUpdated: 1707936000000,
        sensorData: {
            temperature: 23.9,
            humidity: 45,
            vibrations: 0.2,
            acceleration: { x: 0.1, y: 0, z: 9.8 },
            timestamp: 1707936000000
        }
    }
};

// Mock DB operations
export const mockDb = {
    getAllRequests: () => Object.values(requests),

    getRequest: (address: string) => requests[address],

    updateRequest: (address: string, data: Partial<Request>) => {
        console.log('updateRequest', address, data);
        if (!requests[address]) return null;

        requests[address] = {
            ...requests[address],
            ...data,
            lastUpdated: Date.now()
        };

        return requests[address];
    },

    addSensorData: (address: string, sensorData: any) => {
        if (!requests[address]) return null;

        // Update request with sensor data
        requests[address] = {
            ...requests[address],
            lastUpdated: Date.now(),
            sensorData: {
                temperature: sensorData.temperature_x_100 / 100,
                humidity: sensorData.humidity_x_100 / 100,
                vibrations: sensorData.vibrations_x_100 / 100,
                acceleration: {
                    x: sensorData.X,
                    y: sensorData.Y,
                    z: sensorData.Z
                },
                timestamp: Date.now()
            }
        };

        return requests[address];
    }
}; 