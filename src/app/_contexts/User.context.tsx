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
  console.log("UserProvider session:", session);

  // Update the user state whenever the session changes
  useEffect(() => {
    if (session) {
      const { id, name, email, image } = session.user as User;
      setUser({ id, name, email, image });
    } else {
      setUser(null);
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
