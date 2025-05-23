
export type UserRole = 'admin' | 'agent' | 'client';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  licenseNumber?: string;
  phone?: string;
  officeAddress?: string;
  agentId?: string; // For clients, links to their agent
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
