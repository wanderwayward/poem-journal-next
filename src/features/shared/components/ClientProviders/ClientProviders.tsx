// _components/ClientProviders/ClientProviders.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/features/user/context/UserContext";
import { UserPoemsProvider } from "@/features/poem/context/UserPoemsContext";
import { ThemeContextProvider } from "@/features/shared/context/ThemeContext";

interface ClientProvidersProps {
	children: React.ReactNode;
}

const ClientProviders: React.FC<ClientProvidersProps> = ({ children }) => {
	return (
		<SessionProvider>
			<UserProvider>
				<UserPoemsProvider>
					<ThemeContextProvider>{children}</ThemeContextProvider>
				</UserPoemsProvider>
			</UserProvider>
		</SessionProvider>
	);
};

export default ClientProviders;
