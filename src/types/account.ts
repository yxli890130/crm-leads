export interface Account {
  id: string;
  createdAt: string;
  phone: string;
  name: string;
  role: string;
  password: string;
}

export interface AccountPayload {
  phone: string;
  name: string;
  role: string;
}

export const DEFAULT_ACCOUNT_PASSWORD = '123123';
export const RESET_ACCOUNT_PASSWORD = '123456';
