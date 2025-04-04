import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(
    _request: Request,
    context: any
) {
    const headersList = await headers();
    const referer = headersList.get('referer');

    const { address } = await context.params;
    const deliveryRequest = mockDb.getRequest(address);

    // Add caching headers
    const response = NextResponse.json(deliveryRequest ?? { error: 'Request not found' }, {
        status: deliveryRequest ? 200 : 404,
        headers: {
            'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
        },
    });

    return response;
} 