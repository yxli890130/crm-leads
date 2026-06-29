'use client';

interface AccountFilterBarProps {
  createdAt: string;
  phone: string;
  name: string;
  role: string;
  roleOptions: string[];
  onCreatedAtChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onNameChange: (v: string) => void;
  onRoleChange: (v: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

const inputClass = 'border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all';
const labelClass = 'text-xs';

export default function AccountFilterBar({
  createdAt,
  phone,
  name,
  role,
  roleOptions,
  onCreatedAtChange,
  onPhoneChange,
  onNameChange,
  onRoleChange,
  onSearch,
  onReset,
}: AccountFilterBarProps) {
  return (
    <div className="px-6 py-4">
      <div className="rounded-lg px-5 py-4 flex flex-wrap items-end gap-3" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>账号创建时间</label>
          <input
            type="date"
            value={createdAt}
            onChange={(e) => onCreatedAtChange(e.target.value)}
            className={`${inputClass} w-36`}
            style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>手机号</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="输入手机号"
            className={`${inputClass} w-36`}
            style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>用户姓名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="输入姓名"
            className={`${inputClass} w-28`}
            style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>所属角色</label>
          <select
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            className={`${inputClass} w-32`}
            style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
          >
            <option value="">全部</option>
            {roleOptions.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 ml-1">
          <button
            onClick={onSearch}
            className="px-5 py-1.5 text-white text-sm rounded-md transition-all hover:shadow-md hover:-translate-y-px"
            style={{ backgroundColor: '#2e6cf7', border: '1px solid #1d5bd9' }}
          >
            查询
          </button>
          <button
            onClick={onReset}
            className="px-5 py-1.5 text-sm rounded-md border transition-colors"
            style={{ color: '#4e5969', backgroundColor: '#ffffff', borderColor: '#f2f3f5' }}
          >
            重置
          </button>
        </div>
      </div>
    </div>
  );
}
