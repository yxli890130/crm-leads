'use client';

import { useState, useEffect, useCallback } from 'react';
import { Order } from '@/types/order';
import { Lead } from '@/types/lead';
import { Product } from '@/types/product';
import Sidebar from '@/components/Sidebar';
import OrderFilterBar from '@/components/OrderFilterBar';
import OrderTable from '@/components/OrderTable';
import AddOrderModal from '@/components/AddOrderModal';
import DeleteConfirm from '@/components/DeleteConfirm';
import OrderDetailDrawer from '@/components/OrderDetailDrawer';
import OrderEditDrawer from '@/components/OrderEditDrawer';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [createdAt, setCreatedAt] = useState('');
  const [orderNo, setOrderNo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [productName, setProductName] = useState('');

  // Modal / Drawer state
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);
  const [detailTarget, setDetailTarget] = useState<Order | null>(null);
  const [editTarget, setEditTarget] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLeadsAndProducts = useCallback(async () => {
    try {
      const [leadsRes, productsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/products'),
      ]);
      setLeads(await leadsRes.json());
      setProducts(await productsRes.json());
    } catch (err) {
      console.error('Failed to fetch leads/products:', err);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchLeadsAndProducts();
  }, [fetchOrders, fetchLeadsAndProducts]);

  const doSearch = useCallback(async () => {
    const params = new URLSearchParams();
    if (createdAt) {
      params.set('startDate', createdAt);
      params.set('endDate', createdAt);
    }
    if (orderNo) params.set('orderNo', orderNo);
    if (customerName) params.set('customerName', customerName);
    if (customerPhone) params.set('customerPhone', customerPhone);
    if (productName) params.set('productName', productName);

    try {
      const res = await fetch(`/api/orders?${params.toString()}`);
      const data = await res.json();
      setFilteredOrders(data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  }, [createdAt, orderNo, customerName, customerPhone, productName]);

  const resetFilters = () => {
    setCreatedAt('');
    setOrderNo('');
    setCustomerName('');
    setCustomerPhone('');
    setProductName('');
    setFilteredOrders(orders);
  };

  const handleAdd = async (data: {
    leadId: string;
    productId: string;
  }) => {
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      await fetchOrders();
      setAddOpen(false);
    } catch (err) {
      console.error('Add failed:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await fetch(`/api/orders?id=${deleteTarget.id}`, { method: 'DELETE' });
      await fetchOrders();
      setDeleteTarget(null);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = async (data: {
    id: string;
    leadId: string;
    productId: string;
  }) => {
    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      await fetchOrders();
      setEditTarget(null);
    } catch (err) {
      console.error('Edit failed:', err);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between shrink-0" style={{ borderColor: '#e5e6eb' }}>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: '#1d2129' }}>订单管理</h2>
            <p className="text-sm mt-0.5" style={{ color: '#86909c' }}>
              共 {filteredOrders.length} 条订单
            </p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="px-4 py-2 text-white text-sm rounded-md transition-all hover:shadow-md hover:-translate-y-px flex items-center gap-2"
            style={{ backgroundColor: '#2e6cf7', border: '1px solid #1d5bd9', borderRadius: '6px' }}
          >
            <span className="text-lg leading-none">+</span> 新增订单
          </button>
        </header>

        <OrderFilterBar
          createdAt={createdAt}
          orderNo={orderNo}
          customerName={customerName}
          customerPhone={customerPhone}
          productName={productName}
          onCreatedAtChange={setCreatedAt}
          onOrderNoChange={setOrderNo}
          onCustomerNameChange={setCustomerName}
          onCustomerPhoneChange={setCustomerPhone}
          onProductNameChange={setProductName}
          onSearch={doSearch}
          onReset={resetFilters}
        />

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <OrderTable
            orders={filteredOrders}
            leads={leads}
            products={products}
            onDetail={setDetailTarget}
            onEdit={setEditTarget}
            onDelete={setDeleteTarget}
          />
        )}
      </div>

      <AddOrderModal
        open={addOpen}
        leads={leads}
        products={products}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
      />

      <DeleteConfirm
        open={deleteTarget !== null}
        leadName={deleteTarget?.orderNo || ''}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      <OrderDetailDrawer
        open={detailTarget !== null}
        order={detailTarget}
        leads={leads}
        products={products}
        onClose={() => setDetailTarget(null)}
      />

      <OrderEditDrawer
        open={editTarget !== null}
        order={editTarget}
        leads={leads}
        products={products}
        onClose={() => setEditTarget(null)}
        onSave={handleEdit}
      />
    </div>
  );
}
