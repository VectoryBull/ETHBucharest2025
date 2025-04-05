'use client';

import { useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

interface BotMessage {
    sender: 'user' | 'bot';
    text: string;
    chart_data?: {
        vibrations?: [string, number][];
        temperature?: [string, number][];
        humidity?: [string, number][];
    };
}

export default function ChatAnalytics() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<BotMessage[]>([]);
    const [sentOnce, setSentOnce] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        setMessages(prev => [...prev, { sender: 'user', text: trimmed }]);
        setInput('');
        setSentOnce(true);
        setLoading(true);

        try {
            const res = await fetch('https://ethb2025-e2g7w.ondigitalocean.app/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: trimmed }),
            });

            const data = await res.json();

            setMessages(prev => [
                ...prev,
                {
                    sender: 'bot',
                    text: data.reply || '[No response]',
                    chart_data: data.chart_data || null,
                },
            ]);

        } catch (err) {
            console.error('API error:', err);
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: '[Error talking to the server]' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-[70vh] bg-gray-900 rounded-lg overflow-hidden flex flex-col">
            {!sentOnce ? (
                <InitialInput 
                    input={input} 
                    setInput={setInput} 
                    handleSend={handleSend} 
                />
            ) : (
                <ChatInterface 
                    messages={messages} 
                    loading={loading}
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                />
            )}
        </div>
    );
}

function InitialInput({ input, setInput, handleSend }: {
    input: string;
    setInput: (value: string) => void;
    handleSend: () => void;
}) {
    return (
        <div className="flex-1 flex items-center justify-center px-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full max-w-md p-2 border border-gray-700 rounded bg-gray-800 text-white"
                placeholder="Ask about your shipment analytics..."
            />
        </div>
    );
}

function ChatInterface({ messages, loading, input, setInput, handleSend }: {
    messages: BotMessage[];
    loading: boolean;
    input: string;
    setInput: (value: string) => void;
    handleSend: () => void;
}) {
    return (
        <>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg, i) => (
                    <Message key={i} message={msg} />
                ))}
                {loading && (
                    <div className="text-sm text-gray-400 italic">Analyzing data...</div>
                )}
            </div>
            <div className="p-4 bg-gray-800">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
                    placeholder="Ask another question..."
                />
            </div>
        </>
    );
}

function Message({ message }: { message: BotMessage }) {
    return (
        <div className="space-y-2">
            <div
                className={`p-2 rounded max-w-[80%] ${
                    message.sender === 'user'
                        ? 'bg-blue-600 text-white self-end ml-auto'
                        : 'bg-gray-700 text-white self-start'
                }`}
            >
                {message.text}
            </div>
            {message.sender === 'bot' && message.chart_data && (
                <div className="space-y-4">
                    {message.chart_data.vibrations && (
                        <ChartSection
                            data={message.chart_data.vibrations}
                            label="Vibrations"
                            color="#facc15"
                        />
                    )}
                    {message.chart_data.temperature && (
                        <ChartSection
                            data={message.chart_data.temperature}
                            label="Temperature (°C)"
                            color="#38bdf8"
                        />
                    )}
                    {message.chart_data.humidity && (
                        <ChartSection
                            data={message.chart_data.humidity}
                            label="Humidity (%)"
                            color="#34d399"
                        />
                    )}
                </div>
            )}
        </div>
    );
}

function ChartSection({
    data,
    label,
    color,
}: {
    data: [string, number][];
    label: string;
    color: string;
}) {
    const parsedData = data.map(([timestamp, value]) => ({
        timestamp: new Date(timestamp).toLocaleTimeString(),
        value,
    }));

    return (
        <div className="h-48 w-full bg-gray-800 rounded-lg p-2">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={parsedData}>
                    <defs>
                        <linearGradient id={`color-${label}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="timestamp" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                        labelStyle={{ color: "#fff" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        name={label}
                        stroke={color}
                        fillOpacity={1}
                        fill={`url(#color-${label})`}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
} 