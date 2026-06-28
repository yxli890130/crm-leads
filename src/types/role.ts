export interface PagePermission {
  page: string;
  functions: string[]; // ['view', 'edit', 'add', 'delete']
  dataScope: 'all' | 'self';
}

export interface Role {
  id: string;
  createdAt: string;
  name: string;
  permissions: PagePermission[];
}

export const ALL_PAGES = [
  { key: '线索管理', label: '线索管理' },
  { key: '商品管理', label: '商品管理' },
  { key: '订单管理', label: '订单管理' },
  { key: '数据仪表盘', label: '数据仪表盘' },
  { key: '角色管理', label: '角色管理' },
];

export const ALL_FUNCTIONS = [
  { key: 'view', label: '查看' },
  { key: 'edit', label: '修改' },
  { key: 'add', label: '增加' },
  { key: 'delete', label: '删除' },
];

export const DATA_SCOPES = [
  { key: 'all', label: '全部' },
  { key: 'self', label: '仅自己' },
];

export function formatPermissions(perms: PagePermission[]): string[] {
  const tags: string[] = [];
  for (const p of perms) {
    const funcs = p.functions.map((f) => ALL_FUNCTIONS.find((af) => af.key === f)?.label || f).join('/');
    tags.push(`${p.page} [${funcs}] [${p.dataScope === 'all' ? '全部' : '仅自己'}]`);
  }
  return tags;
}
