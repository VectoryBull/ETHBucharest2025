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
    sensorData: SensorData;
}

export interface SensorData {
    temperature: number;
    humidity: number;
    vibrations: number;
    acceleration: {
        x: number;
        y: number;
        z: number;
    };
    timestamp: number;
}

export type RequestSummary = Pick<Request, 'address' | 'type' | 'status' | 'delivery' | 'deadline' | 'amount'>; 