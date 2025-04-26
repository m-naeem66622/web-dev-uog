import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import { useAuth } from '@/components/AuthProvider';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogin } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  
  // Get the intended destination from location state, or default to dashboard
  const from = location.state?.from?.pathname || getDefaultRoute();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function getDefaultRoute() {
    const userRole = localStorage.getItem('userRole');
    switch(userRole) {
      case 'admin': return '/admin';
      case 'buyer': return '/buyer';
      case 'seller': return '/seller';
      default: return '/';
    }
  }

  async function onSubmit(data: LoginFormValues) {
    try {
      setLoginError(null);
      await handleLogin(data.email, data.password);
      
      // Navigate to the intended destination or role-based dashboard
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setLoginError(errorMessage || 'Login failed. Please check your credentials.');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loginError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                    <div className="text-right">
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
