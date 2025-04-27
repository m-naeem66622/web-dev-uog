import React, { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { RootLayout } from "./RouteLayout";
import { ProtectedRouteWrapper } from "./ProtectedRouteWrapper";
import { LoadingFallback } from "@/utils/loading";
// Pages with lazy loading
const Home = lazy(() => import("@/pages/common/Home"));
const Dashboard = lazy(() => import("@/pages/admin/index"));
const Customer = lazy(() => import("@/pages/Customer/index"));
const SkilledPeoplePage = lazy(
  () => import("@/pages/Customer/SkillPeopleList")
);
const AppointmentsPage = lazy(() => import("@/pages/Customer/Appointments"));
const SellerDashboard = lazy(() => import("@/pages/Seller"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Login = lazy(() => import("@/pages/auth/Login"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const VerifyEmail = lazy(() => import("@/pages/auth/VerifyEmail"));

const VerificationPending = lazy(
  () => import("@/pages/auth/VerificationPending")
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRouteWrapper allowedRoles={["admin"]}>
            <Suspense fallback={<LoadingFallback />}>
              <Dashboard />
            </Suspense>
          </ProtectedRouteWrapper>
        ),
      },
      {
        path: "customer",
        element: (
          <ProtectedRouteWrapper allowedRoles={["customer"]}>
            <Customer />
          </ProtectedRouteWrapper>
        ),
      },
      {
        path: "search",
        element: <SkilledPeoplePage />,
      },
      {
        path: "customer/appointments",
        element: (
          <ProtectedRouteWrapper allowedRoles={["customer"]}>
            <AppointmentsPage />
          </ProtectedRouteWrapper>
        ),
      },
      {
        path: "seller",
        element: (
          <ProtectedRouteWrapper allowedRoles={["seller"]}>
            <SellerDashboard />
          </ProtectedRouteWrapper>
        ),
      },
      // Auth Routes (public)
      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "reset-password",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "verify-email",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <VerifyEmail />
          </Suspense>
        ),
      },
      {
        path: "verification-pending",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <VerificationPending />
          </Suspense>
        ),
      },
    ],
  },
];
