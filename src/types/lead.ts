export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  priority: 'high' | 'medium' | 'low';
  source: string;
  follower: string;
}

export type LeadPriority = 'high' | 'medium' | 'low';

export const PRIORITY_LABELS: Record<LeadPriority, string> = {
  high: '高',
  medium: '中',
  low: '低',
};

export const PRIORITY_COLORS: Record<LeadPriority, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};
