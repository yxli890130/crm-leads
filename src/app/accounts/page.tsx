'use client';

import { useState, useEffect, useCallback } from 'react';
import { Account, AccountPayload } from '@/types/account';
import { Role } from '@/types/role';
import Sidebar from '@/components/Sidebar';
import AccountFilterBar from '@/components/AccountFilterBar';
import AccountTable from '@/components/AccountTable';
import AddAccountModal from '@/components/AddAccountModal';
import AccountEditDrawer from '@/components/AccountEditDrawer';
import DeleteConfirm from '@/components/DeleteConfirm';
import PasswordResetConfirm from '@/components/PasswordResetConfirm';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [roleOptions, setRoleOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [createdAt, setCreatedAt] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Account | null>(null);
  const [resetTarget, setResetTarget] = useState<Account | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Account | null>(null);

  const fetchAccounts = useCallback(async () => {
    try {
      const res = await fetch('/api/accounts');
      const data = await res.json();
      setAccounts(data);
      setFilteredAccounts(data);
    } catch (err) {
      console.error('Failed to fetch accounts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRoles = useCallback(async () => {
    try {
      const res = await fetch('/api/roles');
      const data = await res.json();
      const names = (data as Role[]).map((item) => item.name).filter(Boolean).sort();
      setRoleOptions(names);
    } catch (err) {
      console.error('Failed to fetch roles:', err);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchAccounts();
      fetchRoles();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchAccounts, fetchRoles]);

  const doSearch = useCallback(async () => {
    const params = new URLSearchParams();
    if (createdAt) {
      params.set('startDate', createdAt);
      params.set('endDate', createdAt);
    }
    if (phone) params.set('phone', phone);
    if (name) params.set('name', name);
    if (role) params.set('role', role);

    try {
      const res = await fetch(`/api/accounts?${params.toString()}`);
      const data = await res.json();
      setFilteredAccounts(data);
    } catch (err) {
      console.error('Search accounts failed:', err);
    }
  }, [createdAt, phone, name, role]);

  const resetFilters = () => {
    setCreatedAt('');
    setPhone('');
    setName('');
    setRole('');
    setFilteredAccounts(accounts);
  };

  const handleAdd = async (data: AccountPayload) => {
    try {
      await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      await fetchAccounts();
      setAddOpen(false);
    } catch (err) {
      console.error('Add account failed:', err);
    }
  };

  const handleEdit = async (data: AccountPayload & { id: string }) => {
    try {
      await fetch('/api/accounts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      await fetchAccounts();
      setEditTarget(null);
    } catch (err) {
      console.error('Edit account failed:', err);
    }
  };

  const handleResetPassword = async () => {
    if (!resetTarget) return;
    try {
      await fetch('/api/accounts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: resetTarget.id, action: 'resetPassword' }),
      });
      await fetchAccounts();
      setResetTarget(null);
    } catch (err) {
      console.error('Reset password failed:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await fetch(`/api/accounts?id=${deleteTarget.id}`, { method: 'DELETE' });
      await fetchAccounts();
      setDeleteTarget(null);
    } catch (err) {
      console.error('Delete account failed:', err);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white px-6 py-4 flex items-center justify-between shrink-0" style={{ borderBottom: '1px solid #e5e6eb' }}>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: '#1d2129' }}>账号管理</h2>
            <p className="text-sm mt-0.5" style={{ color: '#86909c' }}>
              共 {filteredAccounts.length} 个账号
            </p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="px-4 py-2 text-white text-sm rounded-md transition-all hover:shadow-md hover:-translate-y-px flex items-center gap-2"
            style={{ backgroundColor: '#2e6cf7' }}
          >
            <span className="text-lg leading-none">+</span> 新增账号
          </button>
        </header>

        <AccountFilterBar
          createdAt={createdAt}
          phone={phone}
          name={name}
          role={role}
          roleOptions={roleOptions}
          onCreatedAtChange={setCreatedAt}
          onPhoneChange={setPhone}
          onNameChange={setName}
          onRoleChange={setRole}
          onSearch={doSearch}
          onReset={resetFilters}
        />

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <AccountTable
            accounts={filteredAccounts}
            onEdit={setEditTarget}
            onResetPassword={setResetTarget}
            onDelete={setDeleteTarget}
          />
        )}
      </div>

      <AddAccountModal
        open={addOpen}
        roleOptions={roleOptions}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
      />

      <AccountEditDrawer
        open={editTarget !== null}
        account={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleEdit}
      />

      <PasswordResetConfirm
        open={resetTarget !== null}
        accountName={resetTarget ? `${resetTarget.name} / ${resetTarget.phone}` : ''}
        onClose={() => setResetTarget(null)}
        onConfirm={handleResetPassword}
      />

      <DeleteConfirm
        open={deleteTarget !== null}
        leadName={deleteTarget ? `${deleteTarget.name} / ${deleteTarget.phone}` : ''}
        resourceName="账号"
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
