import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	ReactNode,
	Dispatch,
	SetStateAction,
} from "react";
import { PoemType } from "@/features/poem/poemTypes";
import { useUser } from "../../user/context/User.context";

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

	const fetchPoems = useCallback(async () => {
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
	}, [user]);

	useEffect(() => {
		fetchPoems();
	}, [user, fetchPoems]);

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
