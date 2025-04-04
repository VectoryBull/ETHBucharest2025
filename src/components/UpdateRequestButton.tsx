'use client';

import { useState } from "react";
import { apiService } from "@/services/api";
import { useRouter } from "next/navigation";
interface Props {
    address: string;
    onUpdate?: () => void;
}

export default function UpdateRequestButton({ address, onUpdate }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleClick = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            // Simulate movement by changing X coordinate
            await apiService.updateRequest(address, {
                temperature_x_100: 2390,
                humidity_x_100: 4500,
                vibrations_x_100: 0,
                X: Math.random() * 100,
                Y: Math.random() * 100,
                Z: Math.random() * 100,
                signature: 583
            });
            router.refresh();
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Failed to update request:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            className={`bg-indigo-500 text-white px-4 py-2 rounded-md transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading ? 'Updating...' : 'Update Position'}
        </button>
    );
} 