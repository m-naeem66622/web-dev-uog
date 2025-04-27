import { LoadingFallback } from "@/utils/loading";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const RootLayout = () => (
  <Suspense fallback={<LoadingFallback />}>
    <div className="min-h-screen">
      <Outlet />
    </div>
  </Suspense>
);