'use client';

import { useState, useEffect } from 'react';
import { Order } from '@/types/order';
import { X } from 'lucide-react';

interface OrderEditDrawerProps {
  open: boolean;
  order: Order | null;
  leads: { id: string; name: string; phone: string }[];
  products: { id: string; code: string; name: string; price: number }[];
  onClose: () => void;
  onSave: (data: { id: string; leadId: string; productId: string }) => void;
}

export default function OrderEditDrawer({ open, order, leads, products, onClose, onSave }: OrderEditDrawerProps) {
  const [leadId, setLeadId] = useState('');
  const [productId, setProductId] = useState('');

  useEffect(() => {
    if (order) {
      setLeadId(order.leadId);
      setProductId(order.productId);
    }
  }, [order]);

  if (!open || !order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadId || !productId) return;
    onSave({ id: order.id, leadId, productId });
  };

  const selectedLead = leads.find((l) => l.id === leadId);
  const selectedProduct = products.find((p) => p.id === productId);

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#e5e6eb' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#1d2129' }}>修改订单</h2>
          <button onClick={onClose} className="transition-colors" style={{ color: '#86909c' }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4e5969' }}>订单编号</label>
            <input
              type="text"
              value={order.id}
              disabled
              className="w-full border rounded-lg px-3 py-2 text-sm font-mono"
              style={{ backgroundColor: '#f8f9fa', color: '#86909c', borderColor: '#e5e6eb' }}
            />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4e5969' }}>客户电话 *</label>
            <select
              value={leadId}
              onChange={(e) => setLeadId(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
            >
              <option value="">请选择客户</option>
              {leads.map((l) => (
                <option key={l.id} value={l.id}>{l.phone}（{l.name}）</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4e5969' }}>客户名称</label>
            <input
              type="text"
              value={selectedLead?.name || ''}
              disabled
              className="w-full border rounded-lg px-3 py-2 text-sm"
              style={{ backgroundColor: '#f8f9fa', color: '#86909c', borderColor: '#e5e6eb' }}
            />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4e5969' }}>下单商品 *</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
            >
              <option value="">请选择商品</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}（¥{p.price.toFixed(2)}）</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4e5969' }}>商品编号</label>
            <input
              type="text"
              value={selectedProduct?.code || ''}
              disabled
              className="w-full border rounded-lg px-3 py-2 text-sm font-mono"
              style={{ backgroundColor: '#f8f9fa', color: '#86909c', borderColor: '#e5e6eb' }}
            />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4e5969' }}>下单金额</label>
            <input
              type="text"
              value={selectedProduct ? `¥${selectedProduct.price.toFixed(2)}` : ''}
              disabled
              className="w-full border rounded-lg px-3 py-2 text-sm"
              style={{ backgroundColor: '#f8f9fa', color: '#86909c', borderColor: '#e5e6eb' }}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-lg transition-colors"
              style={{ color: '#4e5969', borderColor: '#e5e6eb' }}
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white rounded-lg transition-colors"
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
