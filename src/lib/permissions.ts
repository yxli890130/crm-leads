import { PagePermission } from '@/types/role';

export interface NavItem {
  label: string;
  href: string;
  disabled: boolean;
  permissionPage: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: '数据仪表盘', href: '/dashboard', disabled: false, permissionPage: '数据仪表盘' },
  { label: '线索管理', href: '/', disabled: false, permissionPage: '线索管理' },
  { label: '商品管理', href: '/products', disabled: false, permissionPage: '商品管理' },
  { label: '订单管理', href: '/orders', disabled: false, permissionPage: '订单管理' },
  { label: '角色管理', href: '/roles', disabled: false, permissionPage: '角色与权限管理' },
  { label: '账号管理', href: '/accounts', disabled: false, permissionPage: '账号管理' },
];

export function canViewPage(permissions: PagePermission[], page: string): boolean {
  return permissions.some((item) => item.page === page && item.functions.includes('view'));
}

export function getAllowedNavItems(permissions: PagePermission[]): NavItem[] {
  return NAV_ITEMS.filter((item) => canViewPage(permissions, item.permissionPage));
}

export function getPermissionPageByPath(pathname: string): string | null {
  const matched = [...NAV_ITEMS]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => (item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`)));

  return matched?.permissionPage || null;
}

export function getFirstAllowedPath(permissions: PagePermission[]): string | null {
  return getAllowedNavItems(permissions)[0]?.href || null;
}
