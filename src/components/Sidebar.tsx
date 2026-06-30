'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const items = [
    { label: '数据仪表盘', href: '/dashboard', disabled: false },
    { label: '线索管理', href: '/', disabled: false },
    { label: '商品管理', href: '/products', disabled: false },
    { label: '订单管理', href: '/orders', disabled: false },
    { label: '角色管理', href: '/roles', disabled: false },
    { label: '账号管理', href: '/accounts', disabled: false },
  ];

  const handleClick = (href: string, disabled: boolean) => {
    if (disabled) return;
    router.push(href);
  };

  return (
    <aside className="w-56 bg-white flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6" style={{ borderBottom: '1px solid #e5e6eb' }}>
        <h1 className="text-lg font-bold tracking-wide" style={{ color: '#1d2129' }}>CRM Leads</h1>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-0.5">
          {items.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <li key={item.label}>
                <button
                  onClick={() => handleClick(item.href, item.disabled)}
                  className={`w-full text-left px-6 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'font-medium'
                      : item.disabled
                      ? 'cursor-not-allowed'
                      : 'hover:bg-gray-50'
                  }`}
                  style={
                    isActive
                      ? { color: '#2e6cf7', backgroundColor: '#f2f8ff', borderLeft: '3px solid #2e6cf7', paddingLeft: 'calc(1.5rem - 3px)' }
                      : item.disabled
                      ? { color: '#86909c', backgroundColor: 'transparent' }
                      : { color: '#4e5969', borderLeft: '3px solid transparent', paddingLeft: 'calc(1.5rem - 3px)' }
                  }
                  disabled={item.disabled}
                >
                  {item.label}
                  {item.disabled && (
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ color: '#86909c', backgroundColor: '#f2f3f5' }}>
                      开发中
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
