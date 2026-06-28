'use client';

interface OrderFilterBarProps {
  createdAt: string;
  orderNo: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  onCreatedAtChange: (v: string) => void;
  onOrderNoChange: (v: string) => void;
  onCustomerNameChange: (v: string) => void;
  onCustomerPhoneChange: (v: string) => void;
  onProductNameChange: (v: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

const inputClass = "border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all";
const labelClass = "text-xs";

export default function OrderFilterBar({
  createdAt, orderNo, customerName, customerPhone, productName,
  onCreatedAtChange, onOrderNoChange, onCustomerNameChange, onCustomerPhoneChange, onProductNameChange,
  onSearch, onReset,
}: OrderFilterBarProps) {
  return (
    <div className="px-6 py-4">
      <div className="rounded-lg px-5 py-4 flex flex-wrap items-end gap-3" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>创建时间</label>
          <input type="date" value={createdAt} onChange={(e) => onCreatedAtChange(e.target.value)}
            className={`${inputClass} w-36`} style={{ borderColor: '#e5e6eb', color: '#1d2129' }} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>订单编号</label>
          <input type="text" value={orderNo} onChange={(e) => onOrderNoChange(e.target.value)}
            placeholder="输入订单编号" className={`${inputClass} w-32`} style={{ borderColor: '#e5e6eb', color: '#1d2129' }} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>客户名</label>
          <input type="text" value={customerName} onChange={(e) => onCustomerNameChange(e.target.value)}
            placeholder="输入客户名" className={`${inputClass} w-28`} style={{ borderColor: '#e5e6eb', color: '#1d2129' }} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>客户电话</label>
          <input type="text" value={customerPhone} onChange={(e) => onCustomerPhoneChange(e.target.value)}
            placeholder="输入客户电话" className={`${inputClass} w-32`} style={{ borderColor: '#e5e6eb', color: '#1d2129' }} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>商品名</label>
          <input type="text" value={productName} onChange={(e) => onProductNameChange(e.target.value)}
            placeholder="输入商品名" className={`${inputClass} w-28`} style={{ borderColor: '#e5e6eb', color: '#1d2129' }} />
        </div>
        <div className="flex gap-2 ml-1">
          <button onClick={onSearch}
            className="px-5 py-1.5 text-white text-sm rounded-md transition-all hover:shadow-md hover:-translate-y-px"
            style={{ backgroundColor: '#2e6cf7', border: '1px solid #1d5bd9' }}>
            查询
          </button>
          <button onClick={onReset}
            className="px-5 py-1.5 text-sm rounded-md border transition-colors"
            style={{ color: '#4e5969', backgroundColor: '#ffffff', borderColor: '#f2f3f5' }}>
            重置
          </button>
        </div>
      </div>
    </div>
  );
}
