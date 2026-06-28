'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddRoleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function AddRoleModal({ open, onClose, onSubmit }: AddRoleModalProps) {
  const [name, setName] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim());
    setName('');
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={handleBackdrop}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4" style={{ border: '1px solid #e5e6eb' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #e5e6eb' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#1d2129' }}>新增角色</h2>
          <button onClick={onClose} className="transition-colors" style={{ color: '#86909c' }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4e5969' }}>角色名 *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ border: '1px solid #e5e6eb', color: '#1d2129' }}
              placeholder="请输入角色名"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-lg border transition-colors hover:bg-gray-50" style={{ color: '#4e5969', borderColor: '#e5e6eb' }}>
              取消
            </button>
            <button type="submit" className="px-4 py-2 text-sm rounded-lg text-white transition-all" style={{ backgroundColor: '#2e6cf7' }}>
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
