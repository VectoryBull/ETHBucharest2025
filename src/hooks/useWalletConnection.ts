import { useState, useEffect } from 'react';

const ARBITRUM_SEPOLIA = {
    chainId: '0x66EEE',  // 421614 in hex
    chainName: 'Arbitrum Sepolia',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    },
    rpcUrls: ['https://api.zan.top/arb-sepolia'],
    blockExplorerUrls: ['https://sepolia.arbiscan.io/']
};

export interface WalletState {
    address: string | null;
    chainId: number | null;
    isConnected: boolean;
    isConnecting: boolean;
    error: string | null;
}

export function useWalletConnection() {
    const [walletState, setWalletState] = useState<WalletState>({
        address: null,
        chainId: null,
        isConnected: false,
        isConnecting: false,
        error: null
    });

    useEffect(() => {
        // Check if wallet is already connected
        checkConnection();

        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            }
        };
    }, []);

    const checkConnection = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                    setWalletState({
                        address: accounts[0],
                        chainId: parseInt(chainId, 16),
                        isConnected: true,
                        isConnecting: false,
                        error: null
                    });
                }
            } catch (error) {
                console.error('Error checking connection:', error);
            }
        }
    };

    const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
            setWalletState(prev => ({
                ...prev,
                address: accounts[0],
                isConnected: true,
                error: null
            }));
        } else {
            setWalletState({
                address: null,
                chainId: null,
                isConnected: false,
                isConnecting: false,
                error: null
            });
        }
    };

    const handleChainChanged = (chainId: string) => {
        setWalletState(prev => ({
            ...prev,
            chainId: parseInt(chainId, 16)
        }));
    };

    const switchToArbitrumSepolia = async () => {
        if (!window.ethereum) return;

        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: ARBITRUM_SEPOLIA.chainId }],
            });
        } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [ARBITRUM_SEPOLIA],
                    });
                } catch (addError) {
                    console.error('Error adding chain:', addError);
                }
            }
        }
    };

    const connect = async () => {
        if (!window.ethereum) {
            setWalletState(prev => ({
                ...prev,
                error: 'Please install MetaMask!'
            }));
            return;
        }

        setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });

            // Check if we're on Arbitrum Sepolia
            if (parseInt(chainId, 16) !== parseInt(ARBITRUM_SEPOLIA.chainId, 16)) {
                await switchToArbitrumSepolia();
            }

            setWalletState({
                address: accounts[0],
                chainId: parseInt(chainId, 16),
                isConnected: true,
                isConnecting: false,
                error: null
            });
        } catch (error: any) {
            setWalletState(prev => ({
                ...prev,
                isConnecting: false,
                error: error.message
            }));
        }
    };

    const disconnect = () => {
        setWalletState({
            address: null,
            chainId: null,
            isConnected: false,
            isConnecting: false,
            error: null
        });
    };

    return {
        ...walletState,
        connect,
        disconnect
    };
} 