import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./RouteLayout";

const LoginPage = lazy(() => import("../pages/auth/Login"));
const RegisterPage = lazy(() => import("../pages/auth//Register"));
const VerificationPendingPage = lazy(
  () => import("../pages/auth//VerificationPending")
);
const VerifyEmailPage = lazy(() => import("../pages/auth//VerifyEmail"));
const ForgotPasswordPage = lazy(() => import("../pages/auth//ForgotPassword"));
const ResetPasswordPage = lazy(() => import("../pages/auth//ResetPassword"));
const Home = lazy(() => import("../pages/common/Home"));
export const AllRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "verification-pending",
        element: <VerificationPendingPage />,
      },
      {
        path: "verify-email",
        element: <VerifyEmailPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      // {
      //   path: "admin",
      //   element: (
      //     <ProtectedRouteWrapper allowedRoles={["admin"]}>
      //       <AdminPage />
      //     </ProtectedRouteWrapper>
      //   ),
      // }
    ],
  },
]);
