import Cookies from 'js-cookie';

// Mock credentials as per requirements
const MOCK_USER = {
  email: 'admin@petcare.com',
  password: 'Petcare@123',
  name: 'Admin User',
  role: 'admin' as const,
};

export type User = {
  email: string;
  name: string;
  role: 'admin' | 'user';
};

export type LoginCredentials = {
  email: string;
  password: string;
};

const AUTH_COOKIE_NAME = 'petcare_auth_token';
const USER_COOKIE_NAME = 'petcare_user_data';

// Simulates a secure token generation
const generateMockToken = () => {
  return `mock_token_${Math.random().toString(36).substring(2)}_${Date.now()}`;
};

/**
 * Simulates an API login call with a delay.
 * In a real app, this would be a fetch to your backend.
 */
export const signIn = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (credentials.email === MOCK_USER.email && credentials.password === MOCK_USER.password) {
    const token = generateMockToken();
    const user: User = {
      email: MOCK_USER.email,
      name: MOCK_USER.name,
      role: MOCK_USER.role,
    };

    // Set cookies
    // Ensure path is root and sameSite policy is set for better compatibility
    Cookies.set(AUTH_COOKIE_NAME, token, { expires: 1, path: '/', sameSite: 'Lax' });
    Cookies.set(USER_COOKIE_NAME, JSON.stringify(user), { expires: 1, path: '/', sameSite: 'Lax' });

    return { user, token };
  }

  throw new Error('Credenciais inválidas');
};

export const signOut = () => {
  Cookies.remove(AUTH_COOKIE_NAME, { path: '/' });
  Cookies.remove(USER_COOKIE_NAME, { path: '/' });
};

export const isAuthenticated = () => {
  return !!Cookies.get(AUTH_COOKIE_NAME);
};

export const getUser = (): User | null => {
  const userData = Cookies.get(USER_COOKIE_NAME);
  if (!userData) return null;
  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
};
