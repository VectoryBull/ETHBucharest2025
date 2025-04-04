'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useMemo } from 'react';

interface TimelineData {
    timestamp: number;
    temperature: number;
    humidity: number;
    vibrations: number;
    x: number;
    y: number;
    z: number;
}

interface Props {
    data?: TimelineData[];
}

export default function SensorTimeline({ data = [] }: Props) {
    const [timeWindow, setTimeWindow] = useState(3600000); // 1 hour in milliseconds
    const [sliderPosition, setSliderPosition] = useState(100); // Start at latest

    const sortedData = useMemo(() =>
        Array.isArray(data) ? [...data].sort((a, b) => a.timestamp - b.timestamp) : [],
        [data]
    );

    const latestTimestamp = sortedData[sortedData.length - 1]?.timestamp || Date.now();

    const visibleData = useMemo(() => {
        if (!sortedData.length) return [];

        const endTime = latestTimestamp - ((100 - sliderPosition) / 100) * timeWindow;
        const startTime = endTime - timeWindow;
        return sortedData.filter(d => d.timestamp >= startTime && d.timestamp <= endTime);
    }, [sortedData, timeWindow, sliderPosition, latestTimestamp]);

    if (!data?.length) {
        return (
            <div className="h-[200px] w-full flex items-center justify-center text-gray-400">
                No sensor data available
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <select
                    className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1"
                    value={timeWindow}
                    onChange={(e) => setTimeWindow(Number(e.target.value))}
                >
                    <option value={3600000}>Last Hour</option>
                    <option value={86400000}>Last 24 Hours</option>
                    <option value={604800000}>Last Week</option>
                </select>
                <div className="text-sm text-gray-400">
                    {visibleData.length > 0 && (
                        <>
                            {new Date(visibleData[0].timestamp).toLocaleString()}
                            {' - '}
                            {new Date(visibleData[visibleData.length - 1].timestamp).toLocaleString()}
                        </>
                    )}
                </div>
            </div>

            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={visibleData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                            stroke="#9CA3AF"
                        />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                            labelFormatter={(timestamp) => new Date(Number(timestamp)).toLocaleString()}
                        />
                        <Area
                            type="monotone"
                            dataKey="temperature"
                            name="Temperature (°C)"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorTemp)"
                        />
                        <Area
                            type="monotone"
                            dataKey="x"
                            name="Acceleration X"
                            stroke="#82ca9d"
                            fillOpacity={1}
                            fill="url(#colorAcc)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Earlier</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-400">Latest</span>
            </div>
        </div>
    );
} 