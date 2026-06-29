'use client';

import { useState, useEffect } from 'react';
import { Account, AccountPayload } from '@/types/account';
import { X } from 'lucide-react';

interface AccountEditDrawerProps {
  open: boolean;
  account: Account | null;
  onClose: () => void;
  onSave: (data: AccountPayload & { id: string }) => void;
}

const inputClass = 'w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all';
const labelClass = 'block text-sm mb-1';

export default function AccountEditDrawer({ open, account, onClose, onSave }: AccountEditDrawerProps) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (!account) return;

    const timer = window.setTimeout(() => {
      setPhone(account.phone);
      setName(account.name);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [account]);

  if (!open || !account) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !name.trim()) return;
    onSave({
      id: account.id,
      phone: phone.trim(),
      name: name.trim(),
      role: account.role,
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #e5e6eb' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#1d2129' }}>修改账号</h2>
          <button onClick={onClose} style={{ color: '#86909c' }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>账号编号</label>
            <input
              type="text"
              value={account.id}
              disabled
              className={`${inputClass} bg-slate-50 font-mono`}
              style={{ borderColor: '#e5e6eb', color: '#86909c' }}
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>所属角色</label>
            <input
              type="text"
              value={account.role}
              disabled
              className={`${inputClass} bg-slate-50`}
              style={{ borderColor: '#e5e6eb', color: '#86909c' }}
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>手机号 *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={inputClass}
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>用户姓名 *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClass}
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-md transition-colors"
              style={{ color: '#4e5969', borderColor: '#e5e6eb', backgroundColor: '#ffffff' }}
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white rounded-md transition-all hover:shadow-md hover:-translate-y-px"
              style={{ backgroundColor: '#2e6cf7' }}
            >
              保存修改
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
