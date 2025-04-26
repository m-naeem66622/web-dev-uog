import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { MailCheck } from 'lucide-react';

export default function VerificationPending() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email = '' } = location.state || {};
  const [resendStatus, setResendStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // This is a placeholder since we need to implement resend verification in the API
  const handleResendVerification = async () => {
    try {
      setResendStatus('loading');
      // Call resend verification API here when implemented
      // await resendVerificationMutation.mutateAsync({ email });
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setResendStatus('success');
      setErrorMessage(null);
    } catch (err: unknown) {
      setResendStatus('error');
      type ErrorResponse = { response?: { data?: { message?: string } } };
      const errorResponse = (err as ErrorResponse)?.response?.data?.message;
      setErrorMessage(errorResponse || 'Failed to resend verification email');
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <MailCheck size={36} className="text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification link to{' '}
            <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Please check your inbox and click on the verification link to complete your registration.
            If you don't see the email, please check your spam folder.
          </p>
          
          {resendStatus === 'success' && (
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <AlertDescription>Verification email has been resent successfully!</AlertDescription>
            </Alert>
          )}
          
          {resendStatus === 'error' && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleResendVerification}
            disabled={resendStatus === 'loading' || resendStatus === 'success'}
          >
            {resendStatus === 'loading' ? 'Sending...' : 'Resend Verification Email'}
          </Button>
          <Button 
            variant="ghost" 
            className="w-full"
            onClick={goToLogin}
          >
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
