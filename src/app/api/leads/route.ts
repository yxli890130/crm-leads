import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Lead } from '@/types/lead';

const DATA_FILE = path.join(process.cwd(), 'data', 'leads.json');

export const dynamic = 'force-dynamic';

async function readLeads(): Promise<Lead[]> {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as Lead[];
}

async function writeLeads(leads: Lead[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

// GET /api/leads?name=xxx&phone=xxx&source=xxx&priority=xxx&startDate=xxx&endDate=xxx
export async function GET(request: NextRequest) {
  let leads = await readLeads();
  const { searchParams } = request.nextUrl;

  const name = searchParams.get('name')?.trim();
  const phone = searchParams.get('phone')?.trim();
  const source = searchParams.get('source')?.trim();
  const priority = searchParams.get('priority')?.trim();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (name) {
    leads = leads.filter((l) => l.name.includes(name));
  }
  if (phone) {
    leads = leads.filter((l) => l.phone.includes(phone));
  }
  if (source) {
    leads = leads.filter((l) => l.source === source);
  }
  if (priority) {
    leads = leads.filter((l) => l.priority === priority);
  }
  if (startDate) {
    leads = leads.filter((l) => l.createdAt >= startDate);
  }
  if (endDate) {
    leads = leads.filter((l) => l.createdAt <= endDate);
  }

  return NextResponse.json(leads);
}

// POST /api/leads
export async function POST(request: NextRequest) {
  const body = await request.json();
  const leads = await readLeads();

  const maxNum = leads.reduce((max, l) => {
    const match = l.id.match(/LD-\d{4}-(\d{4})/);
    return match ? Math.max(max, parseInt(match[1], 10)) : max;
  }, 0);

  const today = new Date().toISOString().slice(0, 10);
  const newLead: Lead = {
    id: `LD-${new Date().getFullYear()}-${String(maxNum + 1).padStart(4, '0')}`,
    createdAt: today,
    name: body.name || '',
    phone: body.phone || '',
    priority: body.priority || 'medium',
    source: body.source || '未知',
    follower: body.follower || '',
  };

  leads.push(newLead);
  await writeLeads(leads);

  return NextResponse.json(newLead, { status: 201 });
}

// PUT /api/leads
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const leads = await readLeads();
  const idx = leads.findIndex((l) => l.id === body.id);

  if (idx === -1) {
    return NextResponse.json({ error: '线索不存在' }, { status: 404 });
  }

  leads[idx] = {
    ...leads[idx],
    name: body.name ?? leads[idx].name,
    phone: body.phone ?? leads[idx].phone,
    priority: body.priority ?? leads[idx].priority,
    source: body.source ?? leads[idx].source,
    follower: body.follower ?? leads[idx].follower,
  };

  await writeLeads(leads);
  return NextResponse.json(leads[idx]);
}

// DELETE /api/leads
export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: '缺少线索ID' }, { status: 400 });
  }

  const leads = await readLeads();
  const filtered = leads.filter((l) => l.id !== id);

  if (filtered.length === leads.length) {
    return NextResponse.json({ error: '线索不存在' }, { status: 404 });
  }

  await writeLeads(filtered);
  return NextResponse.json({ success: true });
}
