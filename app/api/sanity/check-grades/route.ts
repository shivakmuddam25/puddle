// app/api/sanity/check-grades/route.ts
import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all boards with their grades
    const query = `
      *[_type == "board"] {
        _id,
        name,
        code,
        "grades": *[_type == "grade" && board._ref == ^._id] {
          _id,
          title,
          level
        }
      }
    `;
    
    const boards = await client.fetch(query);
    
    return NextResponse.json({
      success: true,
      boards: boards
    });
  } catch (error) {
    console.error('Error checking grades:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch grades' },
      { status: 500 }
    );
  }
}