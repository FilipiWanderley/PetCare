export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
