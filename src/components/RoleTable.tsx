'use client';

import { Role, ALL_PAGES, ALL_FUNCTIONS, DATA_SCOPES } from '@/types/role';
import { Eye, Settings, Trash2 } from 'lucide-react';

interface RoleTableProps {
  roles: Role[];
  onEditName: (role: Role) => void;
  onEditPerms: (role: Role) => void;
  onDelete: (role: Role) => void;
}

function permCount(role: Role): string {
  const pages = role.permissions.length;
  let funcs = 0;
  let scopes = 0;
  role.permissions.forEach((p) => {
    funcs += p.functions.length;
    if (p.dataScope) scopes++;
  });
  return `${pages}页面 / ${funcs}功能 / ${scopes}数据`;
}

export default function RoleTable({ roles, onEditName, onEditPerms, onDelete }: RoleTableProps) {
  const thClass = 'py-2 px-3 font-semibold whitespace-nowrap text-xs';
  const tdClass = 'py-2 px-3 whitespace-nowrap';

  return (
    <div className="flex-1 overflow-auto px-6 py-4">
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #2e6cf7' }}>
            <th className={thClass} style={{ color: '#4e5969' }}>创建时间</th>
            <th className={thClass} style={{ color: '#4e5969' }}>角色名</th>
            <th className={thClass} style={{ color: '#4e5969' }}>角色权限</th>
            <th className={`${thClass} text-right`} style={{ color: '#4e5969' }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {roles.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-16 text-center" style={{ color: '#86909c' }}>暂无数据</td>
            </tr>
          ) : (
            roles.map((role, idx) => (
              <tr
                key={role.id}
                className="transition-colors"
                style={{
                  backgroundColor: idx % 2 === 1 ? '#fafbfb' : '#ffffff',
                  borderBottom: '1px solid #e5e6eb',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f2f8ff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfb' : '#ffffff'; }}
              >
                <td className={tdClass} style={{ color: '#1d2129' }}>{role.createdAt}</td>
                <td className={tdClass} style={{ color: '#1d2129', fontWeight: 500 }}>{role.name}</td>
                <td className={tdClass}>
                  <div className="flex flex-wrap gap-1 max-w-xl">
                    {role.permissions.map((p, pi) => (
                      <span
                        key={pi}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: '#e8f0ff', color: '#2e6cf7', borderLeft: '3px solid #2e6cf7' }}
                      >
                        {ALL_PAGES.find((pg) => pg.key === p.page)?.label || p.page}
                        <span style={{ color: '#86909c', fontSize: '10px' }}>
                          [{p.functions.map((f) => ALL_FUNCTIONS.find((fn) => fn.key === f)?.label || f).join('/')}]
                        </span>
                        <span style={{ color: '#86909c', fontSize: '10px' }}>
                          {DATA_SCOPES.find((ds) => ds.key === p.dataScope)?.label || p.dataScope}
                        </span>
                      </span>
                    ))}
                    {role.permissions.length === 0 && (
                      <span className="text-xs" style={{ color: '#86909c' }}>未分配权限</span>
                    )}
                  </div>
                  <p className="text-xs mt-1" style={{ color: '#86909c' }}>{permCount(role)}</p>
                </td>
                <td className={`${tdClass} text-right`}>
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEditName(role)}
                      className="p-1.5 rounded transition-colors"
                      style={{ color: '#2e6cf7' }}
                      title="修改角色名"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEditPerms(role)}
                      className="p-1.5 rounded transition-colors"
                      style={{ color: '#4e5969' }}
                      title="修改权限"
                    >
                      <Settings size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(role)}
                      className="p-1.5 rounded transition-colors"
                      style={{ color: '#86909c' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#f53f3f'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#86909c'; }}
                      title="删除"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
