'use client';

import { useState, useEffect } from 'react';
import { Lead, LeadPriority } from '@/types/lead';
import { X } from 'lucide-react';

interface LeadEditDrawerProps {
  open: boolean;
  lead: Lead | null;
  onClose: () => void;
  onSave: (data: { id: string; name: string; phone: string; priority: LeadPriority; source: string; follower: string }) => void;
}

const inputClass = "w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all";
const labelClass = "block text-sm mb-1";

export default function LeadEditDrawer({ open, lead, onClose, onSave }: LeadEditDrawerProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [priority, setPriority] = useState<LeadPriority>('medium');
  const [source, setSource] = useState('');
  const [follower, setFollower] = useState('');

  useEffect(() => {
    if (lead) {
      setName(lead.name);
      setPhone(lead.phone);
      setPriority(lead.priority);
      setSource(lead.source);
      setFollower(lead.follower);
    }
  }, [lead]);

  if (!open || !lead) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onSave({
      id: lead.id,
      name: name.trim(),
      phone: phone.trim(),
      priority,
      source: source.trim() || '未知',
      follower: follower.trim(),
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #e5e6eb' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#1d2129' }}>修改线索</h2>
          <button onClick={onClose} style={{ color: '#86909c' }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>线索编号</label>
            <input
              type="text"
              value={lead.id}
              disabled
              className={`${inputClass} bg-slate-50 font-mono`}
              style={{ borderColor: '#e5e6eb', color: '#86909c' }}
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>姓名 *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClass}
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
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
