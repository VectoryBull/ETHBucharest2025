export const NETWORKS = {
    ARBITRUM_SEPOLIA: {
        name: 'Arbitrum Sepolia',
        chainId: 421614,
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia-rollup.arbitrum.io/rpc',
        explorer: 'https://sepolia.arbiscan.io',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        }
    }
} as const;

export const DEFAULT_NETWORK = NETWORKS.ARBITRUM_SEPOLIA; 