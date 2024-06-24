"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/app/_contexts/User.context";

interface ClientProvidersProps {
  children: React.ReactNode;
}

const ClientProviders: React.FC<ClientProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <UserProvider>{children}</UserProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
