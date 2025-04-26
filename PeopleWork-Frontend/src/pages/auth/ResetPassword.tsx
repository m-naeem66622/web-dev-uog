import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { KeyRound } from 'lucide-react';
import { useAuth as useAuthHook } from '@/services/queries/useAuth';

const resetPasswordSchema = z.object({
  newPassword: z.string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const { resetPasswordMutation } = useAuthHook();
  
  const [resetComplete, setResetComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: ResetPasswordValues) {
    if (!token) {
      setError('Reset token is missing. Please check your reset link.');
      return;
    }

    try {
      setError(null);
      await resetPasswordMutation.mutateAsync({
        token,
        newPassword: data.newPassword,
      });
      setResetComplete(true);
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Reset Password failed. Please try again.');
    }
  }

  const goToLogin = () => {
    navigate('/login');
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Invalid Reset Link</CardTitle>
            <CardDescription className="text-center">
              The password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>
                Please request a new password reset link from the forgot password page.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/forgot-password">
              <Button>Request New Reset Link</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <KeyRound size={32} className="text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {resetComplete ? 'Password Reset Complete' : 'Create New Password'}
          </CardTitle>
          <CardDescription className="text-center">
            {resetComplete 
              ? 'Your password has been reset successfully.' 
              : 'Please enter your new password below'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {resetComplete ? (
            <Alert className="bg-green-50 border-green-200 text-green-800 mb-6">
              <AlertDescription>
                You can now log in with your new password.
              </AlertDescription>
            </Alert>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter new password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm new password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={resetPasswordMutation.isPending}
                >
                  {resetPasswordMutation.isPending ? "Resetting Password..." : "Reset Password"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        
        {resetComplete && (
          <CardFooter className="flex justify-center">
            <Button onClick={goToLogin} className="w-full">
              Go to Login
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
