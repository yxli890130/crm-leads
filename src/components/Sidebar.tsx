'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { clearAuthState, getAuthState, type AuthState } from '@/lib/auth';

const fieldClass = 'w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all';
const labelClass = 'block text-sm mb-1';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [userCenterOpen, setUserCenterOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  const items = [
    { label: '数据仪表盘', href: '/dashboard', disabled: false },
    { label: '线索管理', href: '/', disabled: false },
    { label: '商品管理', href: '/products', disabled: false },
    { label: '订单管理', href: '/orders', disabled: false },
    { label: '角色管理', href: '/roles', disabled: false },
    { label: '账号管理', href: '/accounts', disabled: false },
  ];

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setAuthState(getAuthState());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleClick = (href: string, disabled: boolean) => {
    if (disabled) return;
    router.push(href);
  };

  const resetPasswordForm = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setPasswordSuccess('');
  };

  const openPasswordModal = () => {
    resetPasswordForm();
    setUserCenterOpen(false);
    setPasswordOpen(true);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!authState?.user.id) {
      setPasswordError('当前登录状态异常，请重新登录');
      return;
    }

    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setPasswordError('请完整填写密码信息');
      return;
    }

    if (newPassword.trim() !== confirmPassword.trim()) {
      setPasswordError('两次输入的新密码不一致');
      return;
    }

    setSavingPassword(true);
    try {
      const res = await fetch('/api/accounts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: authState.user.id,
          action: 'changePassword',
          oldPassword: oldPassword.trim(),
          newPassword: newPassword.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.error || '密码修改失败');
        return;
      }

      setPasswordSuccess('密码修改成功');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Change password failed:', err);
      setPasswordError('密码修改失败');
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = () => {
    clearAuthState();
    setUserCenterOpen(false);
    setLogoutOpen(false);
    router.replace('/login');
  };

  const loggedInAt = authState?.loggedInAt
    ? new Date(authState.loggedInAt).toLocaleString('zh-CN', { hour12: false })
    : '—';
  const avatarInitial = (authState?.user.name || '用').charAt(0);

  return (
    <aside className="w-56 bg-white flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6" style={{ borderBottom: '1px solid #e5e6eb' }}>
        <h1 className="text-lg font-bold tracking-wide" style={{ color: '#1d2129' }}>CRM Leads</h1>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-0.5">
          {items.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <li key={item.label}>
                <button
                  onClick={() => handleClick(item.href, item.disabled)}
                  className={`w-full text-left px-6 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'font-medium'
                      : item.disabled
                      ? 'cursor-not-allowed'
                      : 'hover:bg-gray-50'
                  }`}
                  style={
                    isActive
                      ? { color: '#2e6cf7', backgroundColor: '#f2f8ff', borderLeft: '3px solid #2e6cf7', paddingLeft: 'calc(1.5rem - 3px)' }
                      : item.disabled
                      ? { color: '#86909c', backgroundColor: 'transparent' }
                      : { color: '#4e5969', borderLeft: '3px solid transparent', paddingLeft: 'calc(1.5rem - 3px)' }
                  }
                  disabled={item.disabled}
                >
                  {item.label}
                  {item.disabled && (
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ color: '#86909c', backgroundColor: '#f2f3f5' }}>
                      开发中
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="relative px-4 py-4" style={{ borderTop: '1px solid #e5e6eb' }}>
        {userCenterOpen && (
          <div
            className="absolute left-4 bottom-full mb-2 w-72 rounded-xl bg-white p-5 shadow-xl"
            style={{ border: '1px solid #e5e6eb' }}
          >
            <div className="flex items-center gap-3 pb-4" style={{ borderBottom: '1px solid #e5e6eb' }}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-semibold" style={{ backgroundColor: '#e8f0ff', color: '#2e6cf7' }}>
                {avatarInitial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold" style={{ color: '#1d2129' }}>{authState?.user.name || '未登录用户'}</p>
                <p className="mt-0.5 truncate text-xs" style={{ color: '#86909c' }}>用户信息</p>
              </div>
            </div>

            <div className="space-y-3 py-4 text-sm">
              <div className="flex justify-between gap-4">
                <span style={{ color: '#86909c' }}>角色</span>
                <span className="truncate font-medium" style={{ color: '#1d2129' }}>{authState?.user.role || '—'}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: '#86909c' }}>手机号</span>
                <span className="font-mono" style={{ color: '#1d2129' }}>{authState?.user.phone || '—'}</span>
              </div>
              <div>
                <span className="text-sm" style={{ color: '#86909c' }}>登录时间</span>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: '#1d2129' }}>{loggedInAt}</p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={openPasswordModal}
                className="w-full rounded-md px-3 py-2 text-sm transition-all hover:shadow-sm"
                style={{ color: '#2e6cf7', border: '1px solid #d6e4ff', backgroundColor: '#f2f8ff' }}
              >
                修改密码
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserCenterOpen(false);
                  setLogoutOpen(true);
                }}
                className="w-full rounded-md px-3 py-2 text-sm transition-colors hover:bg-red-50"
                style={{ color: '#f53f3f', border: '1px solid #fde2e2' }}
              >
                退出登录
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setUserCenterOpen((open) => !open)}
          className="w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-gray-50"
          style={{ border: '1px solid #e5e6eb' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold" style={{ backgroundColor: '#e8f0ff', color: '#2e6cf7' }}>
              {avatarInitial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium" style={{ color: '#1d2129' }}>{authState?.user.name || '未登录用户'}</p>
              <p className="truncate text-xs" style={{ color: '#86909c' }}>{authState?.user.role || '—'}</p>
            </div>
            <span className="text-xs" style={{ color: '#86909c' }}>⌄</span>
          </div>
        </button>
      </div>

      {passwordOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold" style={{ color: '#1d2129' }}>修改密码</h2>
              <p className="text-sm mt-1" style={{ color: '#86909c' }}>请输入原密码并设置新密码。</p>
            </div>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className={labelClass} style={{ color: '#4e5969' }}>原密码 *</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className={fieldClass}
                  style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label className={labelClass} style={{ color: '#4e5969' }}>新密码 *</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className={fieldClass}
                  style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label className={labelClass} style={{ color: '#4e5969' }}>确认新密码 *</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={fieldClass}
                  style={{ borderColor: '#e5e6eb', color: '#1d2129' }}
                  autoComplete="new-password"
                />
              </div>
              {passwordError && (
                <div className="text-sm rounded-md px-3 py-2" style={{ color: '#f53f3f', backgroundColor: '#fff1f0' }}>
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="text-sm rounded-md px-3 py-2" style={{ color: '#00b42a', backgroundColor: '#e8ffea' }}>
                  {passwordSuccess}
                </div>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setPasswordOpen(false);
                    resetPasswordForm();
                  }}
                  className="px-4 py-2 text-sm border rounded-md transition-colors"
                  style={{ color: '#4e5969', borderColor: '#e5e6eb', backgroundColor: '#ffffff' }}
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="px-4 py-2 text-sm text-white rounded-md transition-all hover:shadow-md disabled:opacity-60"
                  style={{ backgroundColor: '#2e6cf7' }}
                >
                  {savingPassword ? '提交中...' : '提交'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {logoutOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1d2129' }}>确认退出</h2>
            <p className="text-sm mb-6" style={{ color: '#4e5969' }}>确定要退出当前登录状态吗？</p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setLogoutOpen(false)}
                className="px-4 py-2 text-sm border rounded-md transition-colors"
                style={{ color: '#4e5969', borderColor: '#e5e6eb', backgroundColor: '#ffffff' }}
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white rounded-md transition-all hover:shadow-md"
                style={{ backgroundColor: '#f53f3f' }}
              >
                确认退出
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
