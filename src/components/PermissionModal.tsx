'use client';

import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Role, ALL_PAGES, ALL_FUNCTIONS, DATA_SCOPES } from '@/types/role';

interface PermissionModalProps {
  open: boolean;
  role: Role | null;
  onClose: () => void;
  onSave: (roleId: string, permissions: Role['permissions']) => void;
}

export default function PermissionModal({ open, role, onClose, onSave }: PermissionModalProps) {
  const [permissions, setPermissions] = useState<Role['permissions']>([]);

  useEffect(() => {
    if (role) {
      setPermissions(role.permissions ? [...role.permissions] : []);
    }
  }, [role]);

  if (!open || !role) return null;

  const togglePage = (page: string) => {
    const existing = permissions.find((p) => p.page === page);
    if (existing) {
      setPermissions(permissions.filter((p) => p.page !== page));
    } else {
      setPermissions([...permissions, { page, functions: ['view'], dataScope: 'self' }]);
    }
  };

  const toggleFunction = (page: string, fn: string) => {
    setPermissions(
      permissions.map((p) => {
        if (p.page !== page) return p;
        const has = p.functions.includes(fn);
        return {
          ...p,
          functions: has ? p.functions.filter((f) => f !== fn) : [...p.functions, fn],
        };
      })
    );
  };

  const setDataScope = (page: string, scope: 'all' | 'self') => {
    setPermissions(
      permissions.map((p) => (p.page === page ? { ...p, dataScope: scope } : p))
    );
  };

  const handleSave = () => {
    onSave(role.id, permissions);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{ borderColor: '#e5e6eb' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#1d2129' }}>权限设置 — {role.name}</h2>
          <button onClick={onClose} className="transition-colors" style={{ color: '#86909c' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-4 flex-1">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #2e6cf7' }}>
                <th className="py-3 px-3 text-left font-semibold" style={{ color: '#4e5969', fontSize: '12px' }}>页面权限</th>
                <th className="py-3 px-3 text-left font-semibold" style={{ color: '#4e5969', fontSize: '12px' }}>功能权限</th>
                <th className="py-3 px-3 text-left font-semibold" style={{ color: '#4e5969', fontSize: '12px' }}>数据权限</th>
              </tr>
            </thead>
            <tbody>
              {ALL_PAGES.map((page) => {
                const perm = permissions.find((p) => p.page === page.key);
                const isChecked = !!perm;
                return (
                  <tr key={page.key} style={{ borderBottom: '1px solid #e5e6eb' }}>
                    {/* Page checkbox */}
                    <td className="py-4 px-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => togglePage(page.key)}
                          className="w-4 h-4 rounded"
                          style={{ accentColor: '#2e6cf7' }}
                        />
                        <span style={{ color: '#1d2129', fontWeight: 500 }}>{page.label}</span>
                      </label>
                    </td>

                    {/* Functions */}
                    <td className="py-4 px-3">
                      {isChecked ? (
                        <div className="flex flex-wrap gap-3">
                          {ALL_FUNCTIONS.map((fn) => (
                            <label key={fn.key} className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={perm!.functions.includes(fn.key)}
                                onChange={() => toggleFunction(page.key, fn.key)}
                                className="w-3.5 h-3.5 rounded"
                                style={{ accentColor: '#2e6cf7' }}
                              />
                              <span className="text-xs" style={{ color: '#4e5969' }}>{fn.label}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs" style={{ color: '#c9cdd4' }}>—</span>
                      )}
                    </td>

                    {/* Data scope */}
                    <td className="py-4 px-3">
                      {isChecked ? (
                        <div className="flex gap-3">
                          {DATA_SCOPES.map((ds) => (
                            <label key={ds.key} className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="radio"
                                name={`scope-${page.key}`}
                                checked={perm!.dataScope === ds.key}
                                onChange={() => setDataScope(page.key, ds.key)}
                                className="w-3.5 h-3.5"
                                style={{ accentColor: '#2e6cf7' }}
                              />
                              <span className="text-xs" style={{ color: '#4e5969' }}>{ds.label}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs" style={{ color: '#c9cdd4' }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t shrink-0" style={{ borderColor: '#e5e6eb' }}>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md transition-colors hover:bg-slate-50"
            style={{ color: '#4e5969', borderColor: '#e5e6eb' }}
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm text-white rounded-md transition-all hover:shadow-md flex items-center gap-1.5"
            style={{ backgroundColor: '#2e6cf7' }}
          >
            <Check size={16} /> 保存权限
          </button>
        </div>
      </div>
    </div>
  );
}
