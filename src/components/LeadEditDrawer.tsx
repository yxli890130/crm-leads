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
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">修改线索</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">线索编号</label>
            <input
              type="text"
              value={lead.id}
              disabled
              className="w-full border rounded-lg px-3 py-2 text-sm bg-slate-50 text-slate-400 font-mono"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">姓名 *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">电话 *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">优先级</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as LeadPriority)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">客户来源</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">跟进人</label>
            <input
              type="text"
              value={follower}
              onChange={(e) => setFollower(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-lg hover:bg-slate-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              保存修改
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
