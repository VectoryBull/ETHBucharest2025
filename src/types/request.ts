// Smart contract address type (Ethereum address format)
export type Address = `0x${string}`;

// Base request type
export interface Request {
    address: Address;
    type: 'Vehicle' | 'Electronics' | 'Food' | 'Other';
    status: 'Pending' | 'Accepted' | 'In Transit' | 'Delivered';
    pickup: string;
    delivery: string;
    weight: string;
    temperature: string;
    deadline: string;
    amount: string;
    created: number;
    lastUpdated: number;
}

// Request with latest sensor data
export interface RequestWithSensorData extends Request {
    sensorData: {
        temperature: number;
        humidity: number;
        vibration1: number;
        vibration2: number;
        gyro: number;
        timestamp: number;
    };
}

// Request summary for list views
export interface RequestSummary {
    address: Address;
    type: Request['type'];
    status: Request['status'];
    delivery: string;
    deadline: string;
    amount: string;
} 