import { User } from "@/types/user";
import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { LoadingFallback } from "@/utils/loading";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: User["role"][];
  redirectPath?: string;
};

export const ProtectedRouteWrapper = ({
  allowedRoles,
  children,
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const { currentUser, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (currentUser === null || currentUser === undefined) {
    // Store the original intended destination for redirect after login
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
  }

  if (!hasPermission(allowedRoles)) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-xl font-bold text-red-600">Permission Denied</h2>
        <p className="mt-2">
          Your role ({currentUser.role}) doesn't have access to this page.
        </p>
        <a href="/" className="mt-4 text-blue-500 underline">
          Return to home
        </a>
      </div>
    );
  }

  return <>{children}</>;
};
