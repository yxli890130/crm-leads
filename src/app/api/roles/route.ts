import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Role } from '@/types/role';

const DATA_FILE = path.join(process.cwd(), 'data', 'roles.json');

export const dynamic = 'force-dynamic';

async function readRoles(): Promise<Role[]> {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as Role[];
}

async function writeRoles(roles: Role[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(roles, null, 2), 'utf-8');
}

// GET /api/roles?name=xxx
export async function GET(request: NextRequest) {
  let roles = await readRoles();
  const { searchParams } = request.nextUrl;
  const name = searchParams.get('name')?.trim();
  if (name) {
    roles = roles.filter((r) => r.name.includes(name));
  }
  return NextResponse.json(roles);
}

// POST /api/roles
export async function POST(request: NextRequest) {
  const body = await request.json();
  const roles = await readRoles();

  const maxNum = roles.reduce((max, r) => {
    const match = r.id.match(/ROLE-(\d{3})/);
    return match ? Math.max(max, parseInt(match[1], 10)) : max;
  }, 0);

  const newRole: Role = {
    id: `ROLE-${String(maxNum + 1).padStart(3, '0')}`,
    name: body.name || '新角色',
    createdAt: new Date().toISOString().slice(0, 10),
    permissions: [],
  };

  roles.push(newRole);
  await writeRoles(roles);
  return NextResponse.json(newRole, { status: 201 });
}

// PUT /api/roles — 更新角色名或权限
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const roles = await readRoles();
  const idx = roles.findIndex((r) => r.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: '角色不存在' }, { status: 404 });
  }

  if (body.name !== undefined) {
    roles[idx].name = body.name;
  }
  if (body.permissions !== undefined) {
    roles[idx].permissions = body.permissions;
  }

  await writeRoles(roles);
  return NextResponse.json(roles[idx]);
}

// DELETE /api/roles?id=xxx
export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: '缺少角色ID' }, { status: 400 });
  }

  const roles = await readRoles();
  const filtered = roles.filter((r) => r.id !== id);
  if (filtered.length === roles.length) {
    return NextResponse.json({ error: '角色不存在' }, { status: 404 });
  }

  await writeRoles(filtered);
  return NextResponse.json({ success: true });
}
