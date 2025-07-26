import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resolved = searchParams.get('resolved');

  try {
    const incidents = await prisma.incident.findMany({
      where: {
        resolved: resolved ? JSON.parse(resolved) : undefined,
      },
      include: {
        camera: true, // Include related camera data
      },
      orderBy: {
        tsStart: 'desc', // Newest first
      },
    });
    return NextResponse.json(incidents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch incidents' }, { status: 500 });
  }
}