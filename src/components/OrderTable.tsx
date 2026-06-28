'use client';

import { Order } from '@/types/order';
import { Eye, Pencil, Trash2 } from 'lucide-react';

interface OrderTableProps {
  orders: Order[];
  onDetail: (order: Order) => void;
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
}

const thClass = "py-3 px-3 font-semibold whitespace-nowrap";
const tdClass = "py-2 px-3 whitespace-nowrap";

export default function OrderTable({ orders, onDetail, onEdit, onDelete }: OrderTableProps) {
  return (
    <div className="flex-1 overflow-auto px-6 py-4">
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #2e6cf7' }}>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>创建时间</th>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>订单编号</th>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>客户名称</th>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>客户电话</th>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>商品编号</th>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>商品名称</th>
            <th className={thClass} style={{ color: '#4e5969', fontSize: '12px' }}>下单金额</th>
            <th className={`${thClass} text-right`} style={{ color: '#4e5969', fontSize: '12px' }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-16 text-center" style={{ color: '#86909c' }}>
                暂无数据
              </td>
            </tr>
          ) : (
            orders.map((order, idx) => (
              <tr
                key={order.id}
                className="transition-colors group"
                style={{
                  backgroundColor: idx % 2 === 1 ? '#fafbfb' : '#ffffff',
                  borderBottom: '1px solid #e5e6eb',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f2f8ff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfb' : '#ffffff'; }}
              >
                <td className={tdClass} style={{ color: '#1d2129' }}>{order.createdAt}</td>
                <td className={tdClass} style={{ fontFamily: 'monospace', fontSize: '12px', color: '#86909c' }}>
                  {order.id}
                </td>
                <td className={tdClass} style={{ color: '#1d2129', fontWeight: 500 }}>{order.customerName}</td>
                <td className={tdClass} style={{ fontFamily: 'monospace', color: '#4e5969', fontSize: '13px' }}>
                  {order.customerPhone}
                </td>
                <td className={tdClass} style={{ fontFamily: 'monospace', fontSize: '12px', color: '#86909c' }}>
                  {order.productCode}
                </td>
                <td className={tdClass} style={{ color: '#4e5969' }}>{order.productName}</td>
                <td className={tdClass} style={{ color: '#1d2129', fontWeight: 500 }}>
                  ¥{order.amount.toFixed(2)}
                </td>
                <td className={`${tdClass} text-right`}>
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onDetail(order)}
                      className="p-1.5 rounded transition-colors hover:bg-blue-50"
                      style={{ color: '#2e6cf7' }}
                      title="详情"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEdit(order)}
                      className="p-1.5 rounded transition-colors hover:bg-gray-100"
                      style={{ color: '#4e5969' }}
                      title="修改"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(order)}
                      className="p-1.5 rounded transition-colors hover:bg-red-50"
                      style={{ color: '#86909c' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#f53f3f'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#86909c'; }}
                      title="删除"
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
