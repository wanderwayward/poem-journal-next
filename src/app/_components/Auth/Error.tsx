"use client"; // Ensure this component is rendered on the client side

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AuthErrorComponent() {
  const router = useRouter();
  const { error } = router.query;

  useEffect(() => {
    if (error) {
      console.error("Authentication error:", error);
    }
  }, [error]);

  return (
    <div>
      <h1>Authentication Error</h1>
      {error && <p>{error}</p>}
      <p>
        Something went wrong during authentication. Please try again or contact
        support.
      </p>
    </div>
  );
}
