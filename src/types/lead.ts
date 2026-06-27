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

export const PRIORITY_COLORS: Record<LeadPriority, { bg: string; text: string; bar: string }> = {
  high: { bg: '#fff1f0', text: '#f53f3f', bar: '#f53f3f' },
  medium: { bg: '#fff7e8', text: '#ff7d00', bar: '#ff7d00' },
  low: { bg: '#e8ffea', text: '#00b42a', bar: '#00b42a' },
};
