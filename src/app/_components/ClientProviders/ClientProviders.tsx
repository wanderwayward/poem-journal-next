// _components/ClientProviders/ClientProviders.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/app/_contexts/User.context";
import { UserPoemsProvider } from "@/app/_contexts/UserPoems.context";
interface ClientProvidersProps {
  children: React.ReactNode;
}

const ClientProviders: React.FC<ClientProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <UserProvider>
        <UserPoemsProvider>{children}</UserPoemsProvider>
      </UserProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
