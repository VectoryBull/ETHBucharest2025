const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export const apiService = {
    async getRequests() {
        try {
            const res = await fetch(`${API_BASE}/api/requests`, {
                next: { revalidate: 60 }
            });
            if (!res.ok) throw new Error('Failed to fetch requests');
            return res.json();
        } catch (error) {
            console.error('Error fetching requests:', error);
            return [];
        }
    },

    async getRequest(address: string) {
        try {
            const res = await fetch(`${API_BASE}/api/requests/${address}`, {
                next: { revalidate: 60 }
            });
            if (!res.ok) throw new Error('Failed to fetch request');
            return res.json();
        } catch (error) {
            console.error('Error fetching request:', error);
            return null;
        }
    }
}; 