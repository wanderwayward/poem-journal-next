// components/ProtectedRoute.tsx
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "loading") {
      return; // Do nothing while loading
    }
    if (!session) {
      router.push("/auth"); // Redirect to login page if not authenticated
    }
  }, [session, status, router]);

  // Render children if session is available, otherwise null (to prevent flash of protected content)
  return session ? <>{children}</> : null;
};

export default ProtectedRoute;
