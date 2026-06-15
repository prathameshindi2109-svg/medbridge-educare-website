import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'medbridge_educare';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  const db = client.db(DB_NAME);
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

async function handleRequest(request, context) {
  const { params } = context;
  const pathSegments = params?.path || [];
  const path = '/' + pathSegments.join('/');
  const method = request.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: corsHeaders() });
  }

  try {
    // Health check
    if (path === '/health' && method === 'GET') {
      return NextResponse.json({ status: 'ok', service: 'MedBridge Educare API' }, { headers: corsHeaders() });
    }

    // Submit lead/contact form
    if (path === '/leads' && method === 'POST') {
      const body = await request.json();
      const { name, phone, email, message, source } = body;

      if (!name || !phone) {
        return NextResponse.json(
          { error: 'Name and phone are required' },
          { status: 400, headers: corsHeaders() }
        );
      }

      const { db } = await connectToDatabase();
      const lead = {
        id: uuidv4(),
        name,
        phone,
        email: email || '',
        message: message || '',
        source: source || 'website',
        createdAt: new Date().toISOString(),
        status: 'new',
      };

      await db.collection('leads').insertOne(lead);

      return NextResponse.json(
        { success: true, message: 'Thank you! We will contact you shortly.', leadId: lead.id },
        { status: 201, headers: corsHeaders() }
      );
    }

    // Get all leads (admin)
    if (path === '/leads' && method === 'GET') {
      const { db } = await connectToDatabase();
      const leads = await db.collection('leads').find({}).sort({ createdAt: -1 }).toArray();
      return NextResponse.json({ leads }, { headers: corsHeaders() });
    }

    // Submit callback request
    if (path === '/callback' && method === 'POST') {
      const body = await request.json();
      const { name, phone } = body;

      if (!name || !phone) {
        return NextResponse.json(
          { error: 'Name and phone are required' },
          { status: 400, headers: corsHeaders() }
        );
      }

      const { db } = await connectToDatabase();
      const callback = {
        id: uuidv4(),
        name,
        phone,
        type: 'callback',
        createdAt: new Date().toISOString(),
        status: 'pending',
      };

      await db.collection('callbacks').insertOne(callback);

      return NextResponse.json(
        { success: true, message: 'We will call you back shortly!' },
        { status: 201, headers: corsHeaders() }
      );
    }

    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: corsHeaders() }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function GET(request, context) {
  return handleRequest(request, context);
}

export async function POST(request, context) {
  return handleRequest(request, context);
}

export async function PUT(request, context) {
  return handleRequest(request, context);
}

export async function DELETE(request, context) {
  return handleRequest(request, context);
}

export async function OPTIONS(request, context) {
  return handleRequest(request, context);
}