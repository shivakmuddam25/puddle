// app/api/admin/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_token');
  return response;
}