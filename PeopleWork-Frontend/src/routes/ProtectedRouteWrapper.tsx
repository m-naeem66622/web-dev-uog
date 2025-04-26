import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteWrapperProps {
  children: ReactNode;
  allowedRoles: string[];
}

export const ProtectedRouteWrapper = ({
  children,
  allowedRoles,
}: ProtectedRouteWrapperProps) => {
  const { currentUser, isLoading, isVerified } = useAuth();
  const isAuthenticated = !!currentUser;
  const location = useLocation();
  const [, setShowVerificationAlert] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isVerified && !isLoading) {
      setShowVerificationAlert(true);
    }
  }, [isAuthenticated, isVerified, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (!isVerified) {
    // Show email verification required message
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Email Verification Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>
                Your email is not verified. Please check your inbox and verify your email before accessing this page.
              </AlertDescription>
            </Alert>
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/verification-pending'}
              >
                Go to Verification Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userRole = currentUser?.role;
  
  if (!allowedRoles.includes(userRole || '')) {
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>
                You don't have permission to access this page.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is authenticated and authorized
  return <>{children}</>;
};