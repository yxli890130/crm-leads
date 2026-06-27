'use client';

import { useState, useEffect, useCallback } from 'react';
import { Lead, LeadPriority } from '@/types/lead';
import Sidebar from '@/components/Sidebar';
import FilterBar from '@/components/FilterBar';
import LeadTable from '@/components/LeadTable';
import AddLeadModal from '@/components/AddLeadModal';
import DeleteConfirm from '@/components/DeleteConfirm';
import LeadDetailDrawer from '@/components/LeadDetailDrawer';
import LeadEditDrawer from '@/components/LeadEditDrawer';

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [createdAt, setCreatedAt] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('');
  const [priority, setPriority] = useState('');

  // Modal / Drawer state
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
  const [detailTarget, setDetailTarget] = useState<Lead | null>(null);
  const [editTarget, setEditTarget] = useState<Lead | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data);
      setFilteredLeads(data);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const doSearch = useCallback(async () => {
    const params = new URLSearchParams();
    if (createdAt) {
      params.set('startDate', createdAt);
      params.set('endDate', createdAt);
    }
    if (name) params.set('name', name);
    if (phone) params.set('phone', phone);
    if (source) params.set('source', source);
    if (priority) params.set('priority', priority);

    try {
      const res = await fetch(`/api/leads?${params.toString()}`);
      const data = await res.json();
      setFilteredLeads(data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  }, [createdAt, name, phone, source, priority]);

  const resetFilters = () => {
    setCreatedAt('');
    setName('');
    setPhone('');
    setSource('');
    setPriority('');
    setFilteredLeads(leads);
  };

  const handleAdd = async (data: {
    name: string;
    phone: string;
    priority: LeadPriority;
    source: string;
    follower: string;
  }) => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      await fetchLeads();
      setAddOpen(false);
    } catch (err) {
      console.error('Add failed:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await fetch(`/api/leads?id=${deleteTarget.id}`, { method: 'DELETE' });
      await fetchLeads();
      setDeleteTarget(null);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = async (data: {
    id: string;
    name: string;
    phone: string;
    priority: LeadPriority;
    source: string;
    follower: string;
  }) => {
    try {
      await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      await fetchLeads();
      setEditTarget(null);
    } catch (err) {
      console.error('Edit failed:', err);
    }
  };

  const sourceOptions = [...new Set(leads.map((l) => l.source))].sort();

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white px-6 py-4 flex items-center justify-between shrink-0" style={{ borderBottom: '1px solid #e5e6eb' }}>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: '#1d2129' }}>线索管理</h2>
            <p className="text-sm mt-0.5" style={{ color: '#86909c' }}>
              共 {filteredLeads.length} 条线索
            </p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="px-4 py-2 text-white text-sm rounded-md transition-all hover:shadow-md hover:-translate-y-px flex items-center gap-2"
            style={{ backgroundColor: '#2e6cf7' }}
          >
            <span className="text-lg leading-none">+</span> 新增线索
          </button>
        </header>

        <FilterBar
          createdAt={createdAt}
          name={name}
          phone={phone}
          source={source}
          priority={priority}
          sourceOptions={sourceOptions}
          onCreatedAtChange={setCreatedAt}
          onNameChange={setName}
          onPhoneChange={setPhone}
          onSourceChange={setSource}
          onPriorityChange={setPriority}
          onSearch={doSearch}
          onReset={resetFilters}
        />

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <LeadTable
            leads={filteredLeads}
            onDetail={setDetailTarget}
            onEdit={setEditTarget}
            onDelete={setDeleteTarget}
          />
        )}
      </div>

      <AddLeadModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
      />

      <DeleteConfirm
        open={deleteTarget !== null}
        leadName={deleteTarget?.name || ''}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      <LeadDetailDrawer
        open={detailTarget !== null}
        lead={detailTarget}
        onClose={() => setDetailTarget(null)}
      />

      <LeadEditDrawer
        open={editTarget !== null}
        lead={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleEdit}
      />
    </div>
  );
}
