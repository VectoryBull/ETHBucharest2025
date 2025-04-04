const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export const apiService = {
    async getRequests() {
        try {
            const res = await fetch(`${API_BASE}/api/requests`, {
                next: {
                    revalidate: 10,  // Revalidate every 10 seconds
                    tags: ['requests']
                }
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
                next: {
                    revalidate: 10,
                    tags: [`request-${address}`]
                }
            });
            if (!res.ok) throw new Error('Failed to fetch request');
            return res.json();
        } catch (error) {
            console.error('Error fetching request:', error);
            return null;
        }
    },

    async updateRequest(address: string, data: any) {
        try {
            const res = await fetch(`${API_BASE}/api/requests/${address}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                cache: 'no-store' // Don't cache updates
            });
            if (!res.ok) throw new Error('Failed to update request');
            return res.json();
        } catch (error) {
            console.error('Error updating request:', error);
            return null;
        }
    }
}; 