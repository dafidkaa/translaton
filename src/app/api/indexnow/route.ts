import { NextRequest, NextResponse } from 'next/server';
import { submitMainPages } from '@/lib/indexnow';

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();
    
    if (urls && Array.isArray(urls)) {
      // Submit specific URLs
      const { submitToIndexNow } = await import('@/lib/indexnow');
      const success = await submitToIndexNow(urls);
      
      return NextResponse.json({ 
        success, 
        message: success ? 'URLs submitted successfully' : 'Failed to submit URLs' 
      });
    } else {
      // Submit main pages
      const success = await submitMainPages();
      
      return NextResponse.json({ 
        success, 
        message: success ? 'Main pages submitted successfully' : 'Failed to submit main pages' 
      });
    }
  } catch (error) {
    console.error('IndexNow API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'IndexNow API endpoint',
    keyFile: 'https://translaton.com/43dda6a2b8604cf0957ba8c67884f6e8.txt'
  });
}
