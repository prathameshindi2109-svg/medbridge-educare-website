import { NextResponse } from 'next/server';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

async function handleRequest(request, context) {
  const { params } = context;
  const pathSegments = params?.path || [];
  const path = '/' + pathSegments.join('/');
  const method = request.method;

  if (method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: corsHeaders() });
  }

  // Health check
  if (path === '/health' && method === 'GET') {
    return NextResponse.json({ status: 'ok', service: 'MedBridge Educare' }, { headers: corsHeaders() });
  }

  return NextResponse.json(
    { error: 'Not found' },
    { status: 404, headers: corsHeaders() }
  );
}

export async function GET(request, context) {
  return handleRequest(request, context);
}

export async function POST(request, context) {
  return handleRequest(request, context);
}

export async function OPTIONS(request, context) {
  return handleRequest(request, context);
}
