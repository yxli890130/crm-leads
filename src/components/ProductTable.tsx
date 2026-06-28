'use client';

import { Product } from '@/types/product';
import { Eye, Pencil, Trash2 } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  onDetail: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const thClass = "py-3 px-3 font-semibold whitespace-nowrap cursor-pointer select-none";
const tdClass = "py-2 px-3 whitespace-nowrap";

export default function ProductTable({ products, onDetail, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="flex-1 overflow-auto px-6 py-4">
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #2e6cf7' }}>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>
              商品编号 <span className="inline-block ml-0.5 text-[10px] align-middle cursor-pointer select-none" style={{ color: '#c9cdd4' }}>▼</span>
            </th>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>
              创建时间 <span className="inline-block ml-0.5 text-[10px] align-middle cursor-pointer select-none" style={{ color: '#c9cdd4' }}>▼</span>
            </th>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>
              商品名称
            </th>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>
              商品价格
            </th>
            <th className={`${thClass} text-right`} style={{ color: '#4e5969', fontSize: '12px' }}>
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-16 text-center" style={{ color: '#86909c' }}>
                暂无数据
              </td>
            </tr>
          ) : (
            products.map((product, idx) => (
              <tr
                key={product.id}
                className="transition-colors group"
                style={{
                  backgroundColor: idx % 2 === 1 ? '#fafbfb' : '#ffffff',
                  borderBottom: '1px solid #e5e6eb',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f2f8ff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfb' : '#ffffff'; }}
              >
                <td className={tdClass} style={{ fontFamily: 'monospace', fontSize: '12px', color: '#86909c' }}>
                  {product.code}
                </td>
                <td className={tdClass} style={{ color: '#1d2129' }}>{product.createdAt}</td>
                <td className={tdClass} style={{ color: '#1d2129', fontWeight: 500 }}>{product.name}</td>
                <td className={tdClass} style={{ color: '#1d2129', fontWeight: 500 }}>
                  ¥{product.price.toFixed(2)}
                </td>
                <td className={`${tdClass} text-right`}>
                  <div className="flex items-center justify-end gap-0.5">
                    <button
                      onClick={() => onDetail(product)}
                      className="p-1.5 rounded transition-colors hover:bg-blue-50"
                      style={{ color: '#2e6cf7' }}
                      title="详情"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEdit(product)}
                      className="p-1.5 rounded transition-colors hover:bg-gray-100"
                      style={{ color: '#4e5969' }}
                      title="修改"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="p-1.5 rounded transition-colors hover:bg-gray-100"
                      style={{ color: '#86909c' }}
                      title="删除"
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#f53f3f'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#86909c'; }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
