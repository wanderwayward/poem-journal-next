"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      return; // Skip authentication check in development
    }

    if (status === "loading") {
      return; // Do nothing while loading
    }

    if (!session) {
      // Store the current path the user was trying to access
      const callbackUrl = window.location.pathname;
      router.push(`/auth?callbackUrl=${callbackUrl}`); // Redirect to login page with the callback URL
    }
  }, [session, status, router]);

  // Always render children in development mode, otherwise render if session is available
  if (process.env.NODE_ENV === "development" || session) {
    return <>{children}</>;
  }

  return null; // Do not render anything if session is not available and not in development mode
};

export default ProtectedRoute;
