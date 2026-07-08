import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET() {
  try {
    const query = `*[_type == "board" && isActive == true] | order(name asc) {
      _id,
      name,
      code
    }`;
    const boards = await client.fetch(query);
    return NextResponse.json({ success: true, boards });
  } catch (error) {
    console.error('Error fetching boards:', error);
    return NextResponse.json({ error: 'Failed to fetch boards' }, { status: 500 });
  }
}