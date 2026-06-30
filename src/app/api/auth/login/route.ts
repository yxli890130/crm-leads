import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Account } from '@/types/account';
import { Role } from '@/types/role';
import { LoginUser } from '@/lib/auth';

const ACCOUNTS_FILE = path.join(process.cwd(), 'data', 'accounts.json');
const ROLES_FILE = path.join(process.cwd(), 'data', 'roles.json');

export const dynamic = 'force-dynamic';

async function readAccounts(): Promise<Account[]> {
  const raw = await fs.readFile(ACCOUNTS_FILE, 'utf-8');
  return JSON.parse(raw) as Account[];
}

async function readRoles(): Promise<Role[]> {
  const raw = await fs.readFile(ROLES_FILE, 'utf-8');
  return JSON.parse(raw) as Role[];
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const phone = String(body.phone || '').trim();
  const password = String(body.password || '').trim();

  if (!phone || !password) {
    return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
  }

  const accounts = await readAccounts();
  const account = accounts.find((item) => item.phone === phone && item.password === password);

  if (!account) {
    return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
  }

  const roles = await readRoles();
  const role = roles.find((item) => item.name === account.role);

  const user: LoginUser = {
    id: account.id,
    phone: account.phone,
    name: account.name,
    role: account.role,
    permissions: role?.permissions || [],
  };

  return NextResponse.json({ user });
}
