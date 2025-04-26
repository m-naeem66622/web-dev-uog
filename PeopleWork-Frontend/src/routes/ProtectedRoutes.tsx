import { User } from "@/types/user";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: User["role"][];
};

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (currentUser === null || currentUser === undefined) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
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
}
