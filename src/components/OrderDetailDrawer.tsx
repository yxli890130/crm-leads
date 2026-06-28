'use client';

import { useState, useEffect } from 'react';
import { Order } from '@/types/order';
import { X } from 'lucide-react';

interface OrderDetailDrawerProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetailDrawer({ open, order, onClose }: OrderDetailDrawerProps) {
  if (!open || !order) return null;

  const fields: { label: string; value: string }[] = [
    { label: '订单编号', value: order.id },
    { label: '创建时间', value: order.createdAt },
    { label: '客户名称', value: order.customerName },
    { label: '客户电话', value: order.customerPhone },
    { label: '商品编号', value: order.productCode },
    { label: '商品名称', value: order.productName },
    { label: '下单金额', value: `¥${order.amount.toFixed(2)}` },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #e5e6eb' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#1d2129' }}>订单详情</h2>
          <button onClick={onClose} className="transition-colors" style={{ color: '#86909c' }}>
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: '#e8f0ff', color: '#2e6cf7' }}>
              {order.customerName.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-lg" style={{ color: '#1d2129' }}>{order.customerName}</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: '#e8ffea', color: '#00b42a', borderLeft: '3px solid #00b42a' }}>
                ¥{order.amount.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="space-y-4 pt-4" style={{ borderTop: '1px solid #e5e6eb' }}>
            {fields.map((f) => (
              <div key={f.label}>
                <p className="text-xs mb-0.5" style={{ color: '#86909c' }}>{f.label}</p>
                <p className="text-sm" style={{ color: '#1d2129' }}>
                  {f.label === '订单编号' || f.label === '商品编号' ? (
                    <span className="font-mono">{f.value}</span>
                  ) : f.label === '客户电话' ? (
                    <span className="font-mono">{f.value}</span>
                  ) : (
                    f.value
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
