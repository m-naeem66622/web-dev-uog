import { User } from '@/types/user';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useAuth as useAuthHook } from '@/services/queries/useAuth';
import {storage} from '@/utils/performance';

type AuthContext = {
  authToken?: string | null;
  currentUser?: User | null;
  isLoading: boolean;
  isVerified: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
};
const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const {
    user,
    isLoadingUser,
    login,
    logout,
    isAuthenticated,
  } = useAuthHook();

  const authToken = isAuthenticated ? storage.get('authToken') : null;
  
  const isVerified = user?.isVerified || false;

  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      await login({ email, password });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, [login]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const contextValue = useMemo(() => ({
    authToken,
    currentUser: user,
    isLoading: isLoadingUser,
    isVerified,
    handleLogin,
    handleLogout,
  }), [authToken, user, isLoadingUser, isVerified, handleLogin, handleLogout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used inside of a AuthProvider');
  }

  return context;
}