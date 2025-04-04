export const NETWORKS = {
    ARBITRUM_SEPOLIA: {
        id: 421614,
        name: 'Arbitrum Sepolia',
        chainId: '0x66EEE',
        rpcUrl: 'https://api.zan.top/arb-sepolia',
        explorer: 'https://sepolia.arbiscan.io/',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        }
    }
} as const;

export const DEFAULT_NETWORK = NETWORKS.ARBITRUM_SEPOLIA; 