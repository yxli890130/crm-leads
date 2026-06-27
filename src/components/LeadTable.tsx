'use client';

import { Lead, PRIORITY_LABELS, PRIORITY_COLORS } from '@/types/lead';

interface LeadTableProps {
  leads: Lead[];
  onDetail: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export default function LeadTable({ leads, onDetail, onEdit, onDelete }: LeadTableProps) {
  return (
    <div className="flex-1 overflow-auto px-6 py-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3 pr-4 font-medium text-slate-500 whitespace-nowrap">线索编号</th>
            <th className="py-3 pr-4 font-medium text-slate-500 whitespace-nowrap">创建时间</th>
            <th className="py-3 pr-4 font-medium text-slate-500 whitespace-nowrap">姓名</th>
            <th className="py-3 pr-4 font-medium text-slate-500 whitespace-nowrap">电话</th>
            <th className="py-3 pr-4 font-medium text-slate-500 whitespace-nowrap">优先级</th>
            <th className="py-3 pr-4 font-medium text-slate-500 whitespace-nowrap">客户来源</th>
            <th className="py-3 pr-4 font-medium text-slate-500 whitespace-nowrap">跟进人</th>
            <th className="py-3 pr-4 font-medium text-slate-500 whitespace-nowrap text-right">操作</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-16 text-center text-slate-400">
                暂无数据
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id} className="border-b hover:bg-slate-50 transition-colors">
                <td className="py-3 pr-4 font-mono text-xs text-slate-500 whitespace-nowrap">
                  {lead.id}
                </td>
                <td className="py-3 pr-4 whitespace-nowrap">{lead.createdAt}</td>
                <td className="py-3 pr-4 whitespace-nowrap font-medium">{lead.name}</td>
                <td className="py-3 pr-4 whitespace-nowrap font-mono text-slate-500">{lead.phone}</td>
                <td className="py-3 pr-4 whitespace-nowrap">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${PRIORITY_COLORS[lead.priority]}`}>
                    {PRIORITY_LABELS[lead.priority]}
                  </span>
                </td>
                <td className="py-3 pr-4 whitespace-nowrap">{lead.source}</td>
                <td className="py-3 pr-4 whitespace-nowrap">{lead.follower}</td>
                <td className="py-3 pr-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onDetail(lead)}
                      className="px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      详情
                    </button>
                    <button
                      onClick={() => onEdit(lead)}
                      className="px-3 py-1 text-xs text-amber-600 hover:bg-amber-50 rounded transition-colors"
                    >
                      修改
                    </button>
                    <button
                      onClick={() => onDelete(lead)}
                      className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      删除
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
