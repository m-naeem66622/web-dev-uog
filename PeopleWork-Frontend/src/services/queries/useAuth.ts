import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { authAPI } from '@/services/api/authAPI';

const AUTH_USER_CACHE_KEY = 'authUser';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: [AUTH_USER_CACHE_KEY],
    queryFn: () => {
      const user = authAPI.currentUser();
      if (!user) throw new Error('No user found');
      return user;
    },
    enabled: authAPI.isAuthenticated(),
    staleTime: Infinity,
  });
  

  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      queryClient.setQueryData([AUTH_USER_CACHE_KEY], data.user);
    },
  });
  
  const registerMutation = useMutation({
    mutationFn: authAPI.register,
  });
  
  const requestPasswordResetMutation = useMutation({
    mutationFn: authAPI.requestPasswordReset,
  });
  
  const resetPasswordMutation = useMutation({
    mutationFn: authAPI.resetPassword,
  });
  
  const verifyEmailMutation = useMutation({
    mutationFn: authAPI.verifyEmail,
  });

  const verifyOtpMutation = useMutation({
    mutationFn: authAPI.verifyOtp,
    onSuccess: (data) => {
      queryClient.setQueryData([AUTH_USER_CACHE_KEY], data.user);
    },
  });
  
  const resendVerificationMutation = useMutation({
    mutationFn: authAPI.resendVerification,
  });

  const logout = () => {
    authAPI.logout();
    queryClient.setQueryData([AUTH_USER_CACHE_KEY], null);
    queryClient.invalidateQueries({ queryKey: [AUTH_USER_CACHE_KEY] });
  };

  return {
    user,
    isLoadingUser,
    userError,
    isAuthenticated: authAPI.isAuthenticated(),
    login: loginMutation.mutateAsync,
    loginMutation,
    registerMutation,
    requestPasswordResetMutation,
    resetPasswordMutation,
    verifyEmailMutation,
    verifyOtpMutation,
    resendVerificationMutation,
    logout,
  };
};
