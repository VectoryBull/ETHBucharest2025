import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';

export const dynamic = 'force-dynamic';

export async function GET() {
    const requests = mockDb.getAllRequests();
    return NextResponse.json(requests);
} 