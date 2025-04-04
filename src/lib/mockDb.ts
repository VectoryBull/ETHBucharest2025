import type { RequestWithSensorData, SensorData } from '@/types/request';

// Helper to generate mock sensor data
const generateSensorData = (count: number, baseTimestamp: number): SensorData[] => {
    return Array.from({ length: count }, (_, i) => ({
        temperature: 20 + Math.random() * 5,
        humidity: 40 + Math.random() * 10,
        vibrations: Math.random() * 0.5,
        acceleration: {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
            z: 9.8 + (Math.random() * 0.4 - 0.2)
        },
        timestamp: baseTimestamp + (i * 300000) // 5 minutes intervals
    }));
};

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
        lastUpdated: Date.now(),
        sensorData: generateSensorData(12, Date.now() - 3600000) // Last hour of data
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
        sensorData: generateSensorData(12, Date.now() - 3600000) // Last hour of data
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
        sensorData: generateSensorData(12, Date.now() - 3600000) // Last hour of data
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
        sensorData: generateSensorData(12, Date.now() - 3600000) // Last hour of data
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
        sensorData: generateSensorData(12, Date.now() - 3600000) // Last hour of data
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

    addSensorData: (address: string, data: any) => {
        if (!requests[address]) return null;

        const newData: SensorData = {
            temperature: data.temperature_x_100 / 100,
            humidity: data.humidity_x_100 / 100,
            vibrations: data.vibrations_x_100 / 100,
            acceleration: {
                x: data.X,
                y: data.Y,
                z: data.Z
            },
            timestamp: Date.now()
        };

        // Add new data to the array
        requests[address].sensorData = [
            ...requests[address].sensorData,
            newData
        ].sort((a, b) => a.timestamp - b.timestamp);

        // Keep only last 24 hours of data
        const dayAgo = Date.now() - 86400000;
        requests[address].sensorData = requests[address].sensorData
            .filter(d => d.timestamp > dayAgo);

        // Update lastUpdated
        requests[address].lastUpdated = Date.now();

        return requests[address];
    }
}; 