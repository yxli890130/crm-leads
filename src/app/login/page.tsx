'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Phone } from 'lucide-react';
import { getAuthState, LoginUser, saveAuthState } from '@/lib/auth';

const inputClass = 'w-full border rounded-md px-3 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all';
const labelClass = 'block text-sm mb-1.5';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (getAuthState()) {
        router.replace('/');
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone.trim() || !password.trim()) {
      setError('用户名或密码错误');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim(), password: password.trim() }),
      });

      if (!res.ok) {
        setError('用户名或密码错误');
        return;
      }

      const data = await res.json() as { user: LoginUser };
      saveAuthState(data.user);
      router.replace('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError('用户名或密码错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f2f8ff' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-wide" style={{ color: '#1d2129' }}>CRM Leads</h1>
          <p className="text-sm mt-2" style={{ color: '#86909c' }}>客户线索管理系统</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8" style={{ border: '1px solid #e5e6eb' }}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold" style={{ color: '#1d2129' }}>登录</h2>
            <p className="text-sm mt-1" style={{ color: '#86909c' }}>请输入手机号和密码进入系统</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass} style={{ color: '#4e5969' }}>手机号</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: '#86909c' }} />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入手机号"
                  className={inputClass}
                  style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className={labelClass} style={{ color: '#4e5969' }}>密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: '#86909c' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className={inputClass}
                  style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm rounded-md px-3 py-2" style={{ color: '#f53f3f', backgroundColor: '#fff1f0' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2.5 text-white text-sm rounded-md transition-all hover:shadow-md hover:-translate-y-px disabled:opacity-60 disabled:hover:translate-y-0"
              style={{ backgroundColor: '#2e6cf7' }}
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
