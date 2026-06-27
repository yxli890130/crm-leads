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
    <aside className="w-56 bg-slate-900 text-white flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-700">
        <h1 className="text-lg font-bold tracking-wide">CRM Leads</h1>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full text-left px-6 py-2.5 text-sm transition-colors ${
                  item.active
                    ? 'bg-slate-700 text-white font-medium'
                    : item.disabled
                    ? 'text-slate-500 cursor-not-allowed'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
                disabled={item.disabled}
              >
                {item.label}
                {item.disabled && (
                  <span className="ml-2 text-xs text-slate-600">开发中</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
