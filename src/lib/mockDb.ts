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
    '0x1790c579a6865f2f531506bfc7cc55432592c89a': {
        address: '0x1790c579a6865f2f531506bfc7cc55432592c89a',
        type: 'Vehicle',
        status: 'In Transit',
        pickup: 'Miami, FL',
        delivery: 'Atlanta, GA',
        weight: '1800kg',
        temperature: '2-8°C',
        deadline: '2024-03-20',
        amount: '$3200',
        created: 1707936000000,
        lastUpdated: Date.now(),
        sensorData: generateSensorData(12, Date.now() - 3600000)
    },
    '0xb7bee003c769ac1839bd2a2a265d83d4e1dddc7a': {
        address: '0xb7bee003c769ac1839bd2a2a265d83d4e1dddc7a',
        type: 'Electronics',
        status: 'Pending',
        pickup: 'Boston, MA',
        delivery: 'Washington, DC',
        weight: '500kg',
        temperature: '15-25°C',
        deadline: '2024-03-15',
        amount: '$1800',
        created: 1707936000000,
        lastUpdated: Date.now(),
        sensorData: generateSensorData(12, Date.now() - 3600000)
    },
    '0xde591cd279a02d89558720df5b41468ea9124887': {
        address: '0xde591cd279a02d89558720df5b41468ea9124887',
        type: 'Other',
        status: 'Delivered',
        pickup: 'Houston, TX',
        delivery: 'Phoenix, AZ',
        weight: '3500kg',
        temperature: '10-30°C',
        deadline: '2024-03-25',
        amount: '$4500',
        created: 1707936000000,
        lastUpdated: Date.now(),
        sensorData: generateSensorData(12, Date.now() - 3600000)
    },
    '0x73a461283de544dc6e81b7ac5cbcf31d8871cc98': {
        address: '0x73a461283de544dc6e81b7ac5cbcf31d8871cc98',
        type: 'Food',
        status: 'Delivered',
        pickup: 'Seattle, WA',
        delivery: 'San Francisco, CA',
        weight: '1200kg',
        temperature: '15-25°C',
        deadline: '2024-03-10',
        amount: '$2800',
        created: 1707936000000,
        lastUpdated: Date.now(),
        sensorData: generateSensorData(12, Date.now() - 3600000)
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