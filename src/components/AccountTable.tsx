'use client';

import { Account } from '@/types/account';
import { KeyRound, Pencil, Trash2 } from 'lucide-react';

interface AccountTableProps {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onResetPassword: (account: Account) => void;
  onDelete: (account: Account) => void;
}

function formatPhone(phone: string): string {
  if (phone.length >= 9) {
    return phone.slice(0, 3) + ' •••• ' + phone.slice(-4);
  }
  return phone;
}

const thClass = 'py-3 px-3 font-semibold whitespace-nowrap cursor-pointer select-none';
const tdClass = 'py-2 px-3 whitespace-nowrap';

export default function AccountTable({ accounts, onEdit, onResetPassword, onDelete }: AccountTableProps) {
  return (
    <div className="flex-1 overflow-auto px-6 py-4">
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #2e6cf7' }}>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>
              账号编号 <span className="inline-block ml-0.5 text-[10px] align-middle cursor-pointer select-none" style={{ color: '#c9cdd4' }}>▼</span>
            </th>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>
              账号创建时间 <span className="inline-block ml-0.5 text-[10px] align-middle cursor-pointer select-none" style={{ color: '#c9cdd4' }}>▼</span>
            </th>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>手机号</th>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>用户姓名</th>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>所属角色</th>
            <th className={`${thClass} text-right`} style={{ color: '#4e5969', fontSize: '12px' }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {accounts.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-16 text-center" style={{ color: '#86909c' }}>
                暂无数据
              </td>
            </tr>
          ) : (
            accounts.map((account, idx) => (
              <tr
                key={account.id}
                className="transition-colors group"
                style={{
                  backgroundColor: idx % 2 === 1 ? '#fafbfb' : '#ffffff',
                  borderBottom: '1px solid #e5e6eb',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f2f8ff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfb' : '#ffffff'; }}
              >
                <td className={tdClass} style={{ fontFamily: 'monospace', fontSize: '12px', color: '#86909c' }}>
                  {account.id}
                </td>
                <td className={tdClass} style={{ color: '#1d2129' }}>{account.createdAt}</td>
                <td className={tdClass} style={{ fontFamily: 'monospace', color: '#4e5969', fontSize: '13px' }}>
                  {formatPhone(account.phone)}
                </td>
                <td className={tdClass} style={{ color: '#1d2129', fontWeight: 500 }}>{account.name}</td>
                <td className={tdClass}>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
                    style={{ backgroundColor: '#e8f0ff', color: '#2e6cf7', borderLeft: '3px solid #2e6cf7' }}
                  >
                    {account.role}
                  </span>
                </td>
                <td className={`${tdClass} text-right`}>
                  <div className="flex items-center justify-end gap-0.5">
                    <button
                      onClick={() => onEdit(account)}
                      className="p-1.5 rounded transition-colors hover:bg-gray-100"
                      style={{ color: '#4e5969' }}
                      title="修改"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onResetPassword(account)}
                      className="p-1.5 rounded transition-colors hover:bg-blue-50"
                      style={{ color: '#2e6cf7' }}
                      title="重置密码"
                    >
                      <KeyRound size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(account)}
                      className="p-1.5 rounded transition-colors hover:bg-gray-100"
                      style={{ color: '#86909c' }}
                      title="删除"
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#f53f3f'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#86909c'; }}
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
