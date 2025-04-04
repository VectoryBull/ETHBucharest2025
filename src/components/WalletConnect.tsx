'use client';

import { useWalletConnection } from '@/hooks/useWalletConnection';

export default function WalletConnect() {
    const { address, isConnected, isConnecting, error, connect, disconnect } = useWalletConnection();

    if (error) {
        return (
            <div className="text-red-500 text-sm mb-2">
                {error}
            </div>
        );
    }

    if (isConnected) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button
                    onClick={disconnect}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={connect}
            disabled={isConnecting}
            className={`bg-indigo-500 text-white px-4 py-2 rounded-md transition-colors ${isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'
                }`}
        >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
    );
} 