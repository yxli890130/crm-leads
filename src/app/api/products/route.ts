import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Product } from '@/types/product';

const DATA_FILE = path.join(process.cwd(), 'data', 'products.json');

export const dynamic = 'force-dynamic';

async function readProducts(): Promise<Product[]> {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as Product[];
}

async function writeProducts(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

// GET /api/products?code=xxx&name=xxx&startDate=xxx&endDate=xxx
export async function GET(request: NextRequest) {
  let products = await readProducts();
  const { searchParams } = request.nextUrl;

  const code = searchParams.get('code')?.trim();
  const name = searchParams.get('name')?.trim();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (code) {
    products = products.filter((p) => p.code.includes(code));
  }
  if (name) {
    products = products.filter((p) => p.name.includes(name));
  }
  if (startDate) {
    products = products.filter((p) => p.createdAt >= startDate);
  }
  if (endDate) {
    products = products.filter((p) => p.createdAt <= endDate);
  }

  return NextResponse.json(products);
}

// POST /api/products
export async function POST(request: NextRequest) {
  const body = await request.json();
  const products = await readProducts();

  const maxNum = products.reduce((max, p) => {
    const match = p.id.match(/PRD-\d{4}-(\d{4})/);
    return match ? Math.max(max, parseInt(match[1], 10)) : max;
  }, 0);

  const today = new Date().toISOString().slice(0, 10);
  const newProduct: Product = {
    id: `PRD-${new Date().getFullYear()}-${String(maxNum + 1).padStart(4, '0')}`,
    createdAt: today,
    code: body.code || '',
    name: body.name || '',
    price: typeof body.price === 'number' ? body.price : parseFloat(body.price) || 0,
  };

  products.push(newProduct);
  await writeProducts(products);

  return NextResponse.json(newProduct, { status: 201 });
}

// PUT /api/products
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const products = await readProducts();
  const idx = products.findIndex((p) => p.id === body.id);

  if (idx === -1) {
    return NextResponse.json({ error: '商品不存在' }, { status: 404 });
  }

  products[idx] = {
    ...products[idx],
    code: body.code ?? products[idx].code,
    name: body.name ?? products[idx].name,
    price: body.price != null ? body.price : products[idx].price,
  };

  await writeProducts(products);
  return NextResponse.json(products[idx]);
}

// DELETE /api/products
export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: '缺少商品ID' }, { status: 400 });
  }

  const products = await readProducts();
  const filtered = products.filter((p) => p.id !== id);

  if (filtered.length === products.length) {
    return NextResponse.json({ error: '商品不存在' }, { status: 404 });
  }

  await writeProducts(filtered);
  return NextResponse.json({ success: true });
}
