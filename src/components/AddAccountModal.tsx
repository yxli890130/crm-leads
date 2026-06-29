'use client';

import { useState } from 'react';
import { AccountPayload } from '@/types/account';
import { X } from 'lucide-react';

interface AddAccountModalProps {
  open: boolean;
  roleOptions: string[];
  onClose: () => void;
  onSubmit: (data: AccountPayload) => void;
}

const inputClass = 'w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all';
const labelClass = 'block text-sm mb-1';

export default function AddAccountModal({ open, roleOptions, onClose, onSubmit }: AddAccountModalProps) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  if (!open) return null;

  const currentRole = role || roleOptions[0] || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !name.trim() || !currentRole) return;
    onSubmit({ phone: phone.trim(), name: name.trim(), role: currentRole });
    setPhone('');
    setName('');
    setRole('');
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={handleBackdrop}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold" style={{ color: '#1d2129' }}>新增账号</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>手机号 *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={inputClass}
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
              placeholder="请输入手机号"
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
              placeholder="请输入用户姓名"
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>所属角色 *</label>
            <select
              value={currentRole}
              onChange={(e) => setRole(e.target.value)}
              required
              className={inputClass}
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
            >
              {roleOptions.length === 0 ? (
                <option value="">暂无角色</option>
              ) : (
                roleOptions.map((item) => <option key={item} value={item}>{item}</option>)
              )}
            </select>
          </div>
          <p className="text-xs rounded-md px-3 py-2" style={{ color: '#86909c', backgroundColor: '#f8f9fa' }}>
            新增账号默认密码为 123123。
          </p>
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
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
