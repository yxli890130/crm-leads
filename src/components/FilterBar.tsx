'use client';

interface FilterBarProps {
  createdAt: string;
  name: string;
  phone: string;
  source: string;
  priority: string;
  sourceOptions: string[];
  onCreatedAtChange: (v: string) => void;
  onNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onSourceChange: (v: string) => void;
  onPriorityChange: (v: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

const inputClass = "border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all";
const labelClass = "text-xs";

export default function FilterBar({
  createdAt,
  name,
  phone,
  source,
  priority,
  sourceOptions,
  onCreatedAtChange,
  onNameChange,
  onPhoneChange,
  onSourceChange,
  onPriorityChange,
  onSearch,
  onReset,
}: FilterBarProps) {
  return (
    <div className="px-6 py-4">
      <div className="rounded-lg px-5 py-4 flex flex-wrap items-end gap-3" style={{ backgroundColor: '#f8f9fa' }}>
        {/* Creation date */}
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>创建时间</label>
          <input
            type="date"
            value={createdAt}
            onChange={(e) => onCreatedAtChange(e.target.value)}
            className={`${inputClass} w-36`}
            style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
          />
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>姓名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="输入姓名"
            className={`${inputClass} w-28`}
            style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>电话</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="输入电话"
            className={`${inputClass} w-32`}
            style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
          />
        </div>

        {/* Source */}
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>客户来源</label>
          <select
            value={source}
            onChange={(e) => onSourceChange(e.target.value)}
            className={`${inputClass} w-28`}
            style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
          >
            <option value="">全部</option>
            {sourceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: '#4e5969' }}>优先级</label>
          <select
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className={`${inputClass} w-24`}
            style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
          >
            <option value="">全部</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>

        {/* Action buttons */}
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
