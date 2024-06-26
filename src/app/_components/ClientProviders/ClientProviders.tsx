// components/ClientProviders.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/app/_contexts/User.context";
import { Session } from "@/app/_types/Types";

interface ClientProvidersProps {
  children: React.ReactNode;
}

const mockUser = {
  id: "google-115338846542280213252",
  name: "Ruben Aguirre",
  email: "rubenaguirrelizcano@gmail.com",
  image:
    "https://lh3.googleusercontent.com/a/ACg8ocKY5IbX5G27DZsx1-DtZjDzQ-GuW6KWp-jB6nceRlOcRGdhbx7a=s96-c",
};

const mockSession: Session = {
  user: mockUser,
  expires: "9999-12-31T23:59:59.999Z",
};

const ClientProviders: React.FC<ClientProvidersProps> = ({ children }) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <SessionProvider session={isDevelopment ? mockSession : undefined}>
      <UserProvider>{children}</UserProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
