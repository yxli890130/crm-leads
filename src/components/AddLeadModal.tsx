'use client';

import { useState } from 'react';
import { LeadPriority } from '@/types/lead';
import { X } from 'lucide-react';

interface AddLeadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    phone: string;
    priority: LeadPriority;
    source: string;
    follower: string;
  }) => void;
}

const inputClass = "w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all";
const labelClass = "block text-sm mb-1";

export default function AddLeadModal({ open, onClose, onSubmit }: AddLeadModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [priority, setPriority] = useState<LeadPriority>('medium');
  const [source, setSource] = useState('');
  const [follower, setFollower] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onSubmit({ name: name.trim(), phone: phone.trim(), priority, source: source.trim() || '未知', follower: follower.trim() });
    setName('');
    setPhone('');
    setPriority('medium');
    setSource('');
    setFollower('');
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold" style={{ color: '#1d2129' }}>新增线索</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>姓名 *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClass}
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
              placeholder="请输入姓名"
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>电话 *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={inputClass}
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
              placeholder="请输入电话"
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>优先级</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as LeadPriority)}
              className={inputClass}
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
            >
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </div>
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>客户来源</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className={inputClass}
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
              placeholder="如：官网、展会、电话咨询等"
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>跟进人</label>
            <input
              type="text"
              value={follower}
              onChange={(e) => setFollower(e.target.value)}
              className={inputClass}
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
              placeholder="请输入跟进人"
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
              确认添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
