import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET() {
	const memories = await prisma.memory.findMany()

	return NextResponse.json(memories)
}
