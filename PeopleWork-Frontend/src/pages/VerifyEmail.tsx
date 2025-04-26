import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useAuth as useAuthHook } from '@/services/queries/useAuth';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const { verifyEmailMutation } = useAuthHook();
  
  const [verificationState, setVerificationState] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setVerificationState('error');
        setErrorMessage('Verification token is missing');
        return;
      }

      try {
        await verifyEmailMutation.mutateAsync(token);
        setVerificationState('success');
      } catch (err: unknown) {
        setVerificationState('error');
        if (
          err instanceof Error &&
          'response' in err &&
          (err as { response: { data: { message: string } } }).response?.data?.message
        ) {
          setErrorMessage((err as { response: { data: { message: string } } }).response.data.message);
        } else {
          setErrorMessage('Verification failed. Please try again.');
        }
      }
    };

    verifyToken();
  }, [token, verifyEmailMutation]);

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {verificationState === 'loading' && (
              <Loader2 size={40} className="animate-spin text-primary" />
            )}
            {verificationState === 'success' && (
              <CheckCircle size={40} className="text-green-500" />
            )}
            {verificationState === 'error' && (
              <XCircle size={40} className="text-red-500" />
            )}
          </div>
          <CardTitle className="text-2xl text-center">
            {verificationState === 'loading' && 'Verifying Your Email'}
            {verificationState === 'success' && 'Email Verified!'}
            {verificationState === 'error' && 'Verification Failed'}
          </CardTitle>
          <CardDescription className="text-center">
            {verificationState === 'loading' && 'Please wait while we verify your email address...'}
            {verificationState === 'success' && 'Your email has been successfully verified.'}
            {verificationState === 'error' && 'We encountered an issue verifying your email.'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {verificationState === 'error' && errorMessage && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          
          {verificationState === 'success' && (
            <p className="text-center text-muted-foreground">
              You can now log in to access your account and all features of the platform.
            </p>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          {(verificationState === 'success' || verificationState === 'error') && (
            <Button 
              className="w-full"
              onClick={goToLogin}
            >
              Go to Login
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
