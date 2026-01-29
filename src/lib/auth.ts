/**
 * Core authentication types for the application.
 * Defines the shape of user objects and credentials used across the system.
 */

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
