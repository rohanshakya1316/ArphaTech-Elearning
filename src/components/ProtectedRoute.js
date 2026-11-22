"use client";

import { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/authStore";

import { getAuthRedirect } from "@/helpers/authRedirect";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const authState = useAuthStore((state) => state.authState);

  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const redirectPath = getAuthRedirect({
      authState,
      userRole: user?.role,
      pathname,
    });

    if (redirectPath) {
      router.replace(redirectPath);
    }
  }, [hasHydrated, authState, user, pathname, router]);

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  const redirectPath = getAuthRedirect({
    authState,
    userRole: user?.role,
    pathname,
  });

  if (redirectPath) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Redirecting...</p>
      </div>
    );
  }
  return children;
};

export default ProtectedRoute;
