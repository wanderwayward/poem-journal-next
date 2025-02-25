"use client";
import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	useMemo,
} from "react";
import { useSession } from "next-auth/react";
import { UserType } from "@/features/user/userTypes";

// Define the context value type
interface UserContextType {
	user: UserType | null;
	setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
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
	const [user, setUser] = useState<UserType | null>(null);

	// Memoize mock user data for development
	const mockUser = useMemo(
		() => ({
			id: "google-115338846542280213252",
			name: "Ruben Aguirre",
			email: "rubenaguirrelizcano@gmail.com",
			image:
				"https://lh3.googleusercontent.com/a/ACg8ocKY5IbX5G27DZsx1-DtZjDzQ-GuW6KWp-jB6nceRlOcRGdhbx7a=s96-c",
		}),
		[]
	);

	// Function to save user to MongoDB
	const saveUserToMongoDB = async (userData: UserType) => {
		try {
			const response = await fetch("/api/mongodb/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});
			const data = await response.json();

			if (response.ok) {
				console.log("User saved or already exists:", data.user);
			} else {
				console.error("Error saving user:", data.error);
			}
		} catch (error) {
			console.error("Failed to save user to MongoDB:", error);
		}
	};

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			// In development, use the mock user
			setUser(mockUser);
		} else {
			// In production, use the actual session user
			if (session) {
				const { id, name, email, image } = session.user as UserType;
				const newUser = { id, name, email, image };

				// Save user to MongoDB if they don't exist
				saveUserToMongoDB(newUser);
				setUser(newUser);
			} else {
				setUser(null);
			}
		}
	}, [session, mockUser]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
