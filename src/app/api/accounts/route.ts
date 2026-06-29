import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Account, DEFAULT_ACCOUNT_PASSWORD, RESET_ACCOUNT_PASSWORD } from '@/types/account';

const DATA_FILE = path.join(process.cwd(), 'data', 'accounts.json');

export const dynamic = 'force-dynamic';

async function readAccounts(): Promise<Account[]> {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as Account[];
}

async function writeAccounts(accounts: Account[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(accounts, null, 2), 'utf-8');
}

// GET /api/accounts?phone=xxx&name=xxx&role=xxx&startDate=xxx&endDate=xxx
export async function GET(request: NextRequest) {
  let accounts = await readAccounts();
  const { searchParams } = request.nextUrl;

  const phone = searchParams.get('phone')?.trim();
  const name = searchParams.get('name')?.trim();
  const role = searchParams.get('role')?.trim();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (phone) {
    accounts = accounts.filter((account) => account.phone.includes(phone));
  }
  if (name) {
    accounts = accounts.filter((account) => account.name.includes(name));
  }
  if (role) {
    accounts = accounts.filter((account) => account.role === role);
  }
  if (startDate) {
    accounts = accounts.filter((account) => account.createdAt >= startDate);
  }
  if (endDate) {
    accounts = accounts.filter((account) => account.createdAt <= endDate);
  }

  return NextResponse.json(accounts);
}

// POST /api/accounts
export async function POST(request: NextRequest) {
  const body = await request.json();
  const accounts = await readAccounts();

  const phone = String(body.phone || '').trim();
  const name = String(body.name || '').trim();
  const role = String(body.role || '').trim();

  if (!phone || !name || !role) {
    return NextResponse.json({ error: '手机号、用户姓名和所属角色不能为空' }, { status: 400 });
  }

  if (accounts.some((account) => account.phone === phone)) {
    return NextResponse.json({ error: '手机号已存在' }, { status: 409 });
  }

  const maxNum = accounts.reduce((max, account) => {
    const match = account.id.match(/AC-\d{4}-(\d{4})/);
    return match ? Math.max(max, parseInt(match[1], 10)) : max;
  }, 0);

  const today = new Date().toISOString().slice(0, 10);
  const newAccount: Account = {
    id: `AC-${new Date().getFullYear()}-${String(maxNum + 1).padStart(4, '0')}`,
    createdAt: today,
    phone,
    name,
    role,
    password: DEFAULT_ACCOUNT_PASSWORD,
  };

  accounts.push(newAccount);
  await writeAccounts(accounts);

  return NextResponse.json(newAccount, { status: 201 });
}

// PUT /api/accounts
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const accounts = await readAccounts();
  const idx = accounts.findIndex((account) => account.id === body.id);

  if (idx === -1) {
    return NextResponse.json({ error: '账号不存在' }, { status: 404 });
  }

  if (body.action === 'resetPassword') {
    accounts[idx] = {
      ...accounts[idx],
      password: RESET_ACCOUNT_PASSWORD,
    };
  } else {
    const nextPhone = String(body.phone ?? accounts[idx].phone).trim();
    const nextName = String(body.name ?? accounts[idx].name).trim();

    if (!nextPhone || !nextName) {
      return NextResponse.json({ error: '手机号和用户姓名不能为空' }, { status: 400 });
    }

    if (accounts.some((account) => account.id !== body.id && account.phone === nextPhone)) {
      return NextResponse.json({ error: '手机号已存在' }, { status: 409 });
    }

    accounts[idx] = {
      ...accounts[idx],
      phone: nextPhone,
      name: nextName,
    };
  }

  await writeAccounts(accounts);
  return NextResponse.json(accounts[idx]);
}

// DELETE /api/accounts
export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: '缺少账号ID' }, { status: 400 });
  }

  const accounts = await readAccounts();
  const filtered = accounts.filter((account) => account.id !== id);

  if (filtered.length === accounts.length) {
    return NextResponse.json({ error: '账号不存在' }, { status: 404 });
  }

  await writeAccounts(filtered);
  return NextResponse.json({ success: true });
}
