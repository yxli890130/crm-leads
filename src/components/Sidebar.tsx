'use client';

export default function Sidebar() {
  const items = [
    { label: '线索管理', active: true },
    { label: '客户管理', active: false, disabled: true },
    { label: '订单管理', active: false, disabled: true },
    { label: '数据导出', active: false, disabled: true },
    { label: '系统设置', active: false, disabled: true },
  ];

  return (
    <aside className="w-56 bg-white flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6" style={{ borderBottom: '1px solid #e5e6eb' }}>
        <h1 className="text-lg font-bold tracking-wide" style={{ color: '#1d2129' }}>CRM Leads</h1>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full text-left px-6 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                  item.active
                    ? 'font-medium'
                    : item.disabled
                    ? 'cursor-not-allowed'
                    : 'hover:bg-gray-50'
                }`}
                style={
                  item.active
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
          ))}
        </ul>
      </nav>
    </aside>
  );
}
