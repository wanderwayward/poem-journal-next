// _contexts/UserPoems.context.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { PoemType } from "../_types/Types";
import { useUser } from "./User.context";

interface UserPoemsContextType {
  poems: PoemType[];
  setPoems: Dispatch<SetStateAction<PoemType[]>>;
  loading: boolean;
  updatePoems: () => void;
}

const UserPoemsContext = createContext<UserPoemsContextType | null>(null);

interface UserPoemsProviderProps {
  children: ReactNode;
}

export const UserPoemsProvider = ({ children }: UserPoemsProviderProps) => {
  const { user } = useUser();
  const [poems, setPoems] = useState<PoemType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPoems = async () => {
    if (user && user.id) {
      try {
        setLoading(true);
        const response = await fetch(`/api/poems/user/${user.id}`);
        const result = await response.json();
        if (response.ok) {
          setPoems(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching poems:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPoems();
  }, [user]);

  return (
    <UserPoemsContext.Provider
      value={{ poems, setPoems, loading, updatePoems: fetchPoems }}
    >
      {children}
    </UserPoemsContext.Provider>
  );
};

export const useUserPoems = () => {
  const context = useContext(UserPoemsContext);
  if (context === null) {
    throw new Error("useUserPoems must be used within a UserPoemsProvider");
  }
  return context;
};
