import { PagePermission } from '@/types/role';

export interface LoginUser {
  id: string;
  phone: string;
  name: string;
  role: string;
  permissions: PagePermission[];
}

export interface AuthState {
  isLoggedIn: boolean;
  user: LoginUser;
  loggedInAt: string;
}

export const AUTH_STORAGE_KEY = 'crm-auth-state';

export function saveAuthState(user: LoginUser): AuthState {
  const authState: AuthState = {
    isLoggedIn: true,
    user,
    loggedInAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  }

  return authState;
}

export function getAuthState(): AuthState | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as AuthState;
    if (!parsed?.isLoggedIn || !parsed.user?.phone) return null;

    return parsed;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function clearAuthState() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function isAuthenticated(): boolean {
  return getAuthState() !== null;
}
