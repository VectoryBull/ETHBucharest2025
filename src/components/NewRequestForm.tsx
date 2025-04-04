'use client';

import { useState } from 'react';
import { useIoTProcessor } from '@/hooks/useIoTProcessor';
import { useRouter } from 'next/navigation';

export default function NewRequestForm() {
    const router = useRouter();
    const { initializeProcessor, isLoading, error } = useIoTProcessor();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        minTemp: 0,
        maxTemp: 30,
        maxTempChange: 5,
        minHumidity: 30,
        maxHumidity: 70,
        maxVibration1: 100,
        maxVibration2: 100,
        publicKeyE: 65537, // Common RSA public exponent
        publicKeyN: 0 // Will be generated or provided
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await initializeProcessor(
                formData.minTemp,
                formData.maxTemp,
                formData.maxTempChange,
                formData.minHumidity,
                formData.maxHumidity,
                formData.maxVibration1,
                formData.maxVibration2,
                formData.publicKeyE,
                formData.publicKeyN
            );

            router.push('/client/requests');
        } catch (err) {
            console.error('Failed to create request:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseInt(value, 10)
        }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-6">Create New Shipping Request</h2>
                
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Minimum Temperature (°C)
                        </label>
                        <input
                            type="number"
                            name="minTemp"
                            value={formData.minTemp}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Maximum Temperature (°C)
                        </label>
                        <input
                            type="number"
                            name="maxTemp"
                            value={formData.maxTemp}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Max Temperature Change
                        </label>
                        <input
                            type="number"
                            name="maxTempChange"
                            value={formData.maxTempChange}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Minimum Humidity (%)
                        </label>
                        <input
                            type="number"
                            name="minHumidity"
                            value={formData.minHumidity}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Maximum Humidity (%)
                        </label>
                        <input
                            type="number"
                            name="maxHumidity"
                            value={formData.maxHumidity}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Max Vibration 1
                        </label>
                        <input
                            type="number"
                            name="maxVibration1"
                            value={formData.maxVibration1}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Max Vibration 2
                        </label>
                        <input
                            type="number"
                            name="maxVibration2"
                            value={formData.maxVibration2}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 rounded-md bg-indigo-500 text-white font-medium 
                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
                    >
                        {isSubmitting ? 'Creating Request...' : 'Create Request'}
                    </button>
                </div>
            </div>
        </form>
    );
} 