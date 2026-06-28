'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Lead } from '@/types/lead';
import { Product } from '@/types/product';

interface AddOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    leadId: string;
    customerName: string;
    customerPhone: string;
    productId: string;
    productCode: string;
    productName: string;
    amount: number;
  }) => void;
  leads: Lead[];
  products: Product[];
}

export default function AddOrderModal({ open, onClose, onSubmit, leads, products }: AddOrderModalProps) {
  const [leadId, setLeadId] = useState('');
  const [productId, setProductId] = useState('');

  if (!open) return null;

  const selectedLead = leads.find((l) => l.id === leadId);
  const selectedProduct = products.find((p) => p.id === productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !selectedProduct) return;
    onSubmit({
      leadId: selectedLead.id,
      customerName: selectedLead.name,
      customerPhone: selectedLead.phone,
      productId: selectedProduct.id,
      productCode: selectedProduct.code,
      productName: selectedProduct.name,
      amount: selectedProduct.price,
    });
    setLeadId('');
    setProductId('');
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
          <h2 className="text-lg font-semibold" style={{ color: '#1d2129' }}>新增订单</h2>
          <button onClick={onClose} className="hover:opacity-70" style={{ color: '#86909c' }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 客户电话选择 → 自动关联客户名称 */}
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4e5969' }}>客户电话 *</label>
            <select
              value={leadId}
              onChange={(e) => setLeadId(e.target.value)}
              required
              className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ border: '1px solid #e5e6eb', color: '#1d2129' }}
            >
              <option value="">请选择客户电话</option>
              {leads.map((l) => (
                <option key={l.id} value={l.id}>{l.phone}（{l.name}）</option>
              ))}
            </select>
          </div>
          {/* 自动关联的客户名称（只读） */}
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4e5969' }}>客户名称（自动关联）</label>
            <input
              type="text"
              value={selectedLead?.name || ''}
              disabled
              className="w-full rounded-lg px-3 py-2 text-sm"
              style={{ border: '1px solid #e5e6eb', backgroundColor: '#f8f9fa', color: '#86909c' }}
              placeholder="选择客户电话后自动填充"
            />
          </div>
          {/* 商品选择 → 自动关联商品编号 */}
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4e5969' }}>下单商品 *</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ border: '1px solid #e5e6eb', color: '#1d2129' }}
            >
              <option value="">请选择商品</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}（¥{p.price}）</option>
              ))}
            </select>
          </div>
          {/* 自动关联的商品编号（只读） */}
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4e5969' }}>商品编号（自动关联）</label>
            <input
              type="text"
              value={selectedProduct?.code || ''}
              disabled
              className="w-full rounded-lg px-3 py-2 text-sm"
              style={{ border: '1px solid #e5e6eb', backgroundColor: '#f8f9fa', color: '#86909c' }}
              placeholder="选择商品后自动填充"
            />
          </div>
          {/* 自动关联的下单金额（只读） */}
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4e5969' }}>下单金额（自动关联）</label>
            <input
              type="text"
              value={selectedProduct ? `¥${selectedProduct.price.toFixed(2)}` : ''}
              disabled
              className="w-full rounded-lg px-3 py-2 text-sm"
              style={{ border: '1px solid #e5e6eb', backgroundColor: '#f8f9fa', color: '#86909c' }}
              placeholder="选择商品后自动填充"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg transition-colors"
              style={{ border: '1px solid #e5e6eb', color: '#4e5969' }}
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white rounded-lg transition-all hover:shadow-md hover:-translate-y-px"
              style={{ backgroundColor: '#2e6cf7' }}
              disabled={!selectedLead || !selectedProduct}
            >
              确认添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
