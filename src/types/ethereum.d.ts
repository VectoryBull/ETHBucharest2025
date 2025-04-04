import { ExternalProvider } from '@ethersproject/providers';

declare global {
    interface Window {
        ethereum?: ExternalProvider & {
            isMetaMask?: boolean;
            request: (args: { method: string; params?: any[] }) => Promise<any>;
            on: (event: string, callback: (...args: any[]) => void) => void;
            removeListener: (event: string, callback: (...args: any[]) => void) => void;
        };
    }
}

// This export makes the file a module
export {}; 