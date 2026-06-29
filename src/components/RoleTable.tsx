'use client';

import { Role, PagePermission, ALL_PAGES, ALL_FUNCTIONS, DATA_SCOPES } from '@/types/role';
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

function getPageLabel(pageKey: string): string {
  return ALL_PAGES.find((page) => page.key === pageKey)?.label || pageKey;
}

function getPermissionState(permission?: PagePermission) {
  const functionKeys = ALL_FUNCTIONS.map((fn) => fn.key);
  const enabledCount = permission
    ? functionKeys.filter((key) => permission.functions.includes(key)).length
    : 0;

  if (permission && enabledCount === functionKeys.length) {
    return {
      icon: '✅',
      label: '全部权限',
      className: 'border-blue-200 bg-blue-50 text-blue-700',
    };
  }

  if (permission && enabledCount > 0) {
    return {
      icon: '⚡',
      label: '部分权限',
      className: 'border-amber-200 bg-amber-50 text-amber-700',
    };
  }

  return {
    icon: '❌',
    label: '无权限',
    className: 'border-slate-200 bg-slate-50 text-slate-500',
  };
}

function getPermissionTooltip(pageKey: string, permission?: PagePermission): string {
  if (!permission || permission.functions.length === 0) {
    return `${getPageLabel(pageKey)}：无权限`;
  }

  const enabled = permission.functions
    .map((fn) => ALL_FUNCTIONS.find((item) => item.key === fn)?.label || fn)
    .join('/');
  const dataScope = DATA_SCOPES.find((scope) => scope.key === permission.dataScope)?.label || permission.dataScope;

  return `${getPageLabel(pageKey)}：${enabled}｜数据：${dataScope}`;
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
                  <div className="flex flex-wrap gap-1.5 max-w-3xl">
                    {ALL_PAGES.map((page) => {
                      const permission = role.permissions.find((p) => p.page === page.key);
                      const state = getPermissionState(permission);
                      const tooltip = getPermissionTooltip(page.key, permission);

                      return (
                        <span
                          key={page.key}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors cursor-help ${state.className}`}
                          title={tooltip}
                          aria-label={`${page.label}，${state.label}，${tooltip}`}
                        >
                          <span>{page.label}</span>
                          <span aria-hidden="true" className="text-[11px] leading-none">{state.icon}</span>
                        </span>
                      );
                    })}
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
