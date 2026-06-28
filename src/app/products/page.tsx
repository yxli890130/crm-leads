'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product';
import Sidebar from '@/components/Sidebar';
import ProductFilterBar from '@/components/ProductFilterBar';
import ProductTable from '@/components/ProductTable';
import AddProductModal from '@/components/AddProductModal';
import DeleteConfirm from '@/components/DeleteConfirm';
import ProductDetailDrawer from '@/components/ProductDetailDrawer';
import ProductEditDrawer from '@/components/ProductEditDrawer';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [createdAt, setCreatedAt] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  // Modal / Drawer state
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [detailTarget, setDetailTarget] = useState<Product | null>(null);
  const [editTarget, setEditTarget] = useState<Product | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const doSearch = useCallback(async () => {
    const params = new URLSearchParams();
    if (createdAt) {
      params.set('startDate', createdAt);
      params.set('endDate', createdAt);
    }
    if (code) params.set('code', code);
    if (name) params.set('name', name);

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setFilteredProducts(data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  }, [createdAt, code, name]);

  const resetFilters = () => {
    setCreatedAt('');
    setCode('');
    setName('');
    setFilteredProducts(products);
  };

  const handleAdd = async (data: { code: string; name: string; price: number }) => {
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      await fetchProducts();
      setAddOpen(false);
    } catch (err) {
      console.error('Add failed:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await fetch(`/api/products?id=${deleteTarget.id}`, { method: 'DELETE' });
      await fetchProducts();
      setDeleteTarget(null);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = async (data: { id: string; code: string; name: string; price: number }) => {
    try {
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      await fetchProducts();
      setEditTarget(null);
    } catch (err) {
      console.error('Edit failed:', err);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white px-6 py-4 flex items-center justify-between shrink-0" style={{ borderBottom: '1px solid #e5e6eb' }}>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: '#1d2129' }}>商品管理</h2>
            <p className="text-sm mt-0.5" style={{ color: '#86909c' }}>
              共 {filteredProducts.length} 件商品
            </p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="px-4 py-2 text-white text-sm rounded-md transition-all hover:shadow-md hover:-translate-y-px flex items-center gap-2"
            style={{ backgroundColor: '#2e6cf7' }}
          >
            <span className="text-lg leading-none">+</span> 新增商品
          </button>
        </header>

        <ProductFilterBar
          createdAt={createdAt}
          code={code}
          name={name}
          onCreatedAtChange={setCreatedAt}
          onCodeChange={setCode}
          onNameChange={setName}
          onSearch={doSearch}
          onReset={resetFilters}
        />

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <ProductTable
            products={filteredProducts}
            onDetail={setDetailTarget}
            onEdit={setEditTarget}
            onDelete={setDeleteTarget}
          />
        )}
      </div>

      <AddProductModal
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

      <ProductDetailDrawer
        open={detailTarget !== null}
        product={detailTarget}
        onClose={() => setDetailTarget(null)}
      />

      <ProductEditDrawer
        open={editTarget !== null}
        product={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleEdit}
      />
    </div>
  );
}
