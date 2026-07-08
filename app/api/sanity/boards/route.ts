// app/api/sanity/boards/route.ts
import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = `*[_type == "board" && isActive == true] | order(order asc) {
      _id,
      name,
      code,
      description,
      logo
    }`;
    
    const boards = await client.fetch(query);
    
    return NextResponse.json({ 
      success: true, 
      boards: boards 
    });
  } catch (error) {
    console.error('Error fetching boards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch boards' },
      { status: 500 }
    );
  }
}