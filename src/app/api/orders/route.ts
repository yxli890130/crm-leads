import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Order } from '@/types/order';

const DATA_FILE = path.join(process.cwd(), 'data', 'orders.json');

export const dynamic = 'force-dynamic';

async function readOrders(): Promise<Order[]> {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as Order[];
}

async function writeOrders(orders: Order[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

// GET /api/orders?id=xxx&customerName=xxx&customerPhone=xxx&productName=xxx&startDate=xxx&endDate=xxx
export async function GET(request: NextRequest) {
  let orders = await readOrders();
  const { searchParams } = request.nextUrl;

  const id = searchParams.get('id')?.trim();
  const customerName = searchParams.get('customerName')?.trim();
  const customerPhone = searchParams.get('customerPhone')?.trim();
  const productName = searchParams.get('productName')?.trim();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (id) orders = orders.filter((o) => o.id.includes(id));
  if (customerName) orders = orders.filter((o) => o.customerName.includes(customerName));
  if (customerPhone) orders = orders.filter((o) => o.customerPhone.includes(customerPhone));
  if (productName) orders = orders.filter((o) => o.productName.includes(productName));
  if (startDate) orders = orders.filter((o) => o.createdAt >= startDate);
  if (endDate) orders = orders.filter((o) => o.createdAt <= endDate);

  return NextResponse.json(orders);
}

// POST /api/orders
export async function POST(request: NextRequest) {
  const body = await request.json();
  const orders = await readOrders();

  const maxNum = orders.reduce((max, o) => {
    const match = o.id.match(/ORD-\d{4}-(\d{4})/);
    return match ? Math.max(max, parseInt(match[1], 10)) : max;
  }, 0);

  const today = new Date().toISOString().slice(0, 10);
  const newOrder: Order = {
    id: `ORD-${new Date().getFullYear()}-${String(maxNum + 1).padStart(4, '0')}`,
    createdAt: today,
    customerName: body.customerName || '',
    customerPhone: body.customerPhone || '',
    productId: body.productId || '',
    productCode: body.productCode || '',
    productName: body.productName || '',
    amount: body.amount || 0,
  };

  orders.push(newOrder);
  await writeOrders(orders);

  return NextResponse.json(newOrder, { status: 201 });
}

// PUT /api/orders
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const orders = await readOrders();
  const idx = orders.findIndex((o) => o.id === body.id);

  if (idx === -1) {
    return NextResponse.json({ error: '订单不存在' }, { status: 404 });
  }

  orders[idx] = {
    ...orders[idx],
    customerName: body.customerName ?? orders[idx].customerName,
    customerPhone: body.customerPhone ?? orders[idx].customerPhone,
    productId: body.productId ?? orders[idx].productId,
    productCode: body.productCode ?? orders[idx].productCode,
    productName: body.productName ?? orders[idx].productName,
    amount: body.amount ?? orders[idx].amount,
  };

  await writeOrders(orders);
  return NextResponse.json(orders[idx]);
}

// DELETE /api/orders
export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: '缺少订单ID' }, { status: 400 });
  }

  const orders = await readOrders();
  const filtered = orders.filter((o) => o.id !== id);

  if (filtered.length === orders.length) {
    return NextResponse.json({ error: '订单不存在' }, { status: 404 });
  }

  await writeOrders(filtered);
  return NextResponse.json({ success: true });
}
