'use client';

import { Lead, PRIORITY_LABELS, PRIORITY_COLORS } from '@/types/lead';
import { X } from 'lucide-react';

interface LeadDetailDrawerProps {
  open: boolean;
  lead: Lead | null;
  onClose: () => void;
}

export default function LeadDetailDrawer({ open, lead, onClose }: LeadDetailDrawerProps) {
  if (!open || !lead) return null;

  const fields: { label: string; value: string }[] = [
    { label: '线索编号', value: lead.id },
    { label: '创建时间', value: lead.createdAt },
    { label: '姓名', value: lead.name },
    { label: '电话', value: lead.phone },
    { label: '优先级', value: PRIORITY_LABELS[lead.priority] },
    { label: '客户来源', value: lead.source },
    { label: '跟进人', value: lead.follower },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">线索详情</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
              {lead.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-lg">{lead.name}</p>
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${PRIORITY_COLORS[lead.priority]}`}>
                {PRIORITY_LABELS[lead.priority]}优先级
              </span>
            </div>
          </div>
          <div className="space-y-4 border-t pt-4">
            {fields.map((f) => (
              <div key={f.label}>
                <p className="text-xs text-slate-400 mb-0.5">{f.label}</p>
                <p className="text-sm text-slate-800">
                  {f.label === '线索编号' ? (
                    <span className="font-mono">{f.value}</span>
                  ) : f.label === '电话' ? (
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
