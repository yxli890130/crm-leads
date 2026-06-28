'use client';

import { useState, useEffect, useCallback } from 'react';
import { Role } from '@/types/role';
import Sidebar from '@/components/Sidebar';
import RoleTable from '@/components/RoleTable';
import AddRoleModal from '@/components/AddRoleModal';
import PermissionModal from '@/components/PermissionModal';
import DeleteConfirm from '@/components/DeleteConfirm';
import { X } from 'lucide-react';

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState('');

  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Role | null>(null);
  const [editNameTarget, setEditNameTarget] = useState<Role | null>(null);
  const [editNameValue, setEditNameValue] = useState('');
  const [permTarget, setPermTarget] = useState<Role | null>(null);

  const fetchRoles = useCallback(async () => {
    try {
      const res = await fetch('/api/roles');
      const data = await res.json();
      setRoles(data);
      setFilteredRoles(data);
    } catch (err) {
      console.error('Failed to fetch roles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const doSearch = useCallback(async () => {
    const params = new URLSearchParams();
    if (searchName) params.set('name', searchName);
    try {
      const res = await fetch(`/api/roles?${params.toString()}`);
      const data = await res.json();
      setFilteredRoles(data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  }, [searchName]);

  const resetFilters = () => {
    setSearchName('');
    setFilteredRoles(roles);
  };

  const handleAdd = async (name: string) => {
    try {
      await fetch('/api/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      await fetchRoles();
      setAddOpen(false);
    } catch (err) {
      console.error('Add failed:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await fetch(`/api/roles?id=${deleteTarget.id}`, { method: 'DELETE' });
      await fetchRoles();
      setDeleteTarget(null);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEditName = async () => {
    if (!editNameTarget || !editNameValue.trim()) return;
    try {
      await fetch('/api/roles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editNameTarget.id, name: editNameValue.trim() }),
      });
      await fetchRoles();
      setEditNameTarget(null);
    } catch (err) {
      console.error('Edit name failed:', err);
    }
  };

  const handleSavePermissions = async (updated: Role) => {
    try {
      await fetch('/api/roles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: updated.id, permissions: updated.permissions }),
      });
      await fetchRoles();
      setPermTarget(null);
    } catch (err) {
      console.error('Save permissions failed:', err);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between shrink-0" style={{ borderColor: '#e5e6eb' }}>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: '#1d2129' }}>角色与权限管理</h2>
            <p className="text-sm mt-0.5" style={{ color: '#86909c' }}>共 {filteredRoles.length} 个角色</p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="px-4 py-2 text-white text-sm rounded-md transition-all hover:shadow-md hover:-translate-y-px"
            style={{ backgroundColor: '#2e6cf7', border: '1px solid #1d5bd9' }}
          >
            <span className="text-lg leading-none mr-1">+</span> 新增角色
          </button>
        </header>

        {/* Filter Bar */}
        <div className="px-6 py-4">
          <div className="rounded-lg px-5 py-4 flex flex-wrap items-end gap-3" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="flex flex-col gap-1">
              <label className="text-xs" style={{ color: '#4e5969' }}>角色名称</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="输入角色名称"
                className="border rounded-md px-3 py-1.5 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all"
                style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
              />
            </div>
            <div className="flex gap-2 ml-1">
              <button
                onClick={doSearch}
                className="px-5 py-1.5 text-white text-sm rounded-md transition-all hover:shadow-md hover:-translate-y-px"
                style={{ backgroundColor: '#2e6cf7', border: '1px solid #1d5bd9' }}
              >
                查询
              </button>
              <button
                onClick={resetFilters}
                className="px-5 py-1.5 text-sm rounded-md border transition-colors"
                style={{ color: '#4e5969', backgroundColor: '#ffffff', borderColor: '#f2f3f5' }}
              >
                重置
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <RoleTable
            roles={filteredRoles}
            onEditName={(role) => { setEditNameTarget(role); setEditNameValue(role.name); }}
            onEditPerm={(role) => setPermTarget(role)}
            onDelete={setDeleteTarget}
          />
        )}
      </div>

      {/* Add Role Modal */}
      <AddRoleModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
      />

      {/* Edit Name Modal */}
      {editNameTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={(e) => { if (e.target === e.currentTarget) setEditNameTarget(null); }}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold" style={{ color: '#1d2129' }}>修改角色名</h2>
              <button onClick={() => setEditNameTarget(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleEditName(); }} className="space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: '#4e5969' }}>角色名 *</label>
                <input
                  type="text"
                  value={editNameValue}
                  onChange={(e) => setEditNameValue(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: '#e5e6eb' }}
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setEditNameTarget(null)} className="px-4 py-2 text-sm border rounded-lg hover:bg-slate-50 transition-colors" style={{ borderColor: '#e5e6eb', color: '#4e5969' }}>
                  取消
                </button>
                <button type="submit" className="px-4 py-2 text-sm text-white rounded-lg transition-colors" style={{ backgroundColor: '#2e6cf7' }}>
                  确认修改
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permission Modal */}
      <PermissionModal
        open={permTarget !== null}
        role={permTarget}
        onClose={() => setPermTarget(null)}
        onSave={handleSavePermissions}
      />

      {/* Delete Confirm */}
      <DeleteConfirm
        open={deleteTarget !== null}
        leadName={deleteTarget?.name || ''}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
