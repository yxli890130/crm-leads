'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getAuthState } from '@/lib/auth';
import { canViewPage, getFirstAllowedPath, getPermissionPageByPath } from '@/lib/permissions';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (pathname === '/login') {
        setChecked(true);
        return;
      }

      const authState = getAuthState();
      if (!authState) {
        router.replace('/login');
        return;
      }

      const permissionPage = getPermissionPageByPath(pathname);
      if (permissionPage && !canViewPage(authState.user.permissions, permissionPage)) {
        router.replace(getFirstAllowedPath(authState.user.permissions) || '/login');
        return;
      }

      setChecked(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname, router]);

  if (pathname !== '/login' && !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return <>{children}</>;
}
