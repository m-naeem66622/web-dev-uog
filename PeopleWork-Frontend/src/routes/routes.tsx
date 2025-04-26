import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './RouteLayout';
import { ProtectedRouteWrapper } from './ProtectedRouteWrapper';

const LoginPage = lazy(() => import('../pages/Login'));
const RegisterPage = lazy(() => import('../pages/Register'));
const VerificationPendingPage = lazy(() => import('../pages/VerificationPending'));
const VerifyEmailPage = lazy(() => import('../pages/VerifyEmail'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPassword'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPassword'));
const Home = lazy(() => import('../pages/Home'));

export const AllRoutes = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'register',
          element: <RegisterPage />
        },
        {
          path: 'verification-pending',
          element: <VerificationPendingPage />
        },
        {
          path: 'verify-email',
          element: <VerifyEmailPage />
        },
        {
          path: 'forgot-password',
          element: <ForgotPasswordPage />
        },
        {
          path: 'reset-password',
          element: <ResetPasswordPage />
        },
      ]
    }
  ]);