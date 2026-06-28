'use client';

import { Product } from '@/types/product';
import { X } from 'lucide-react';

interface ProductDetailDrawerProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailDrawer({ open, product, onClose }: ProductDetailDrawerProps) {
  if (!open || !product) return null;

  const fields: { label: string; value: string }[] = [
    { label: '商品编号', value: product.code },
    { label: '商品 ID', value: product.id },
    { label: '创建时间', value: product.createdAt },
    { label: '商品名称', value: product.name },
    { label: '商品价格', value: `¥${product.price.toFixed(2)}` },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #e5e6eb' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#1d2129' }}>商品详情</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: '#e8f0ff', color: '#2e6cf7' }}>
              {product.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-lg" style={{ color: '#1d2129' }}>{product.name}</p>
              <p className="text-sm" style={{ color: '#4e5969' }}>{product.code}</p>
            </div>
          </div>
          <div className="space-y-4 pt-4" style={{ borderTop: '1px solid #e5e6eb' }}>
            {fields.map((f) => (
              <div key={f.label}>
                <p className="text-xs mb-0.5" style={{ color: '#86909c' }}>{f.label}</p>
                <p className="text-sm" style={{ color: '#1d2129' }}>
                  {f.label === '商品价格' ? (
                    <span className="font-semibold" style={{ color: '#f53f3f' }}>{f.value}</span>
                  ) : f.label === '商品 ID' ? (
                    <span className="font-mono text-xs" style={{ color: '#86909c' }}>{f.value}</span>
                  ) : f.label === '商品编号' ? (
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
