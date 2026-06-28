'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { code: string; name: string; price: number }) => void;
}

const inputClass = "w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all";
const labelClass = "block text-sm mb-1";

export default function AddProductModal({ open, onClose, onSubmit }: AddProductModalProps) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim() || !price) return;
    onSubmit({ code: code.trim(), name: name.trim(), price: parseFloat(price) });
    setCode('');
    setName('');
    setPrice('');
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
          <h2 className="text-lg font-semibold" style={{ color: '#1d2129' }}>新增商品</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>商品编号 *</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className={inputClass}
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
              placeholder="请输入商品编号"
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>商品名称 *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClass}
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
              placeholder="请输入商品名称"
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#4e5969' }}>商品价格 (¥) *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className={inputClass}
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
              placeholder="请输入价格"
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
