"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";

// Define the shape of the user data
interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

// Define the context value type
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the UserContext with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a custom hook for easy access to the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// UserProvider component to wrap your application and provide user data
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession(); // Use NextAuth's useSession to get the current session
  const [user, setUser] = useState<User | null>(null);

  // Mock user data for development
  const mockUser: User = {
    id: "google-115338846542280213252",
    name: "Ruben Aguirre",
    email: "rubenaguirrelizcano@gmail.com",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKY5IbX5G27DZsx1-DtZjDzQ-GuW6KWp-jB6nceRlOcRGdhbx7a=s96-c",
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // In development, use the mock user
      setUser(mockUser);
    } else {
      // In production, use the actual session user
      if (session) {
        const { id, name, email, image } = session.user as User;
        setUser({ id, name, email, image });
      } else {
        setUser(null);
      }
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
