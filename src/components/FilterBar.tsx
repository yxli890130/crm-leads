'use client';

import { LeadPriority } from '@/types/lead';

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
    <div className="bg-white border-b px-6 py-4">
      <div className="flex flex-wrap items-end gap-3">
        {/* Creation date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">创建时间</label>
          <input
            type="date"
            value={createdAt}
            onChange={(e) => onCreatedAtChange(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">姓名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="模糊搜索"
            className="border rounded px-3 py-1.5 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">电话</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="模糊搜索"
            className="border rounded px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Source */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">客户来源</label>
          <select
            value={source}
            onChange={(e) => onSourceChange(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部</option>
            {sourceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">优先级</label>
          <select
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>

        {/* Action buttons */}
        <button
          onClick={onSearch}
          className="px-5 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          查询
        </button>
        <button
          onClick={onReset}
          className="px-5 py-1.5 bg-slate-200 text-slate-700 text-sm rounded hover:bg-slate-300 transition-colors"
        >
          重置
        </button>
      </div>
    </div>
  );
}
