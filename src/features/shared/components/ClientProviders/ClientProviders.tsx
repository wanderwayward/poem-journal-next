// _components/ClientProviders/ClientProviders.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/features/user/context/UserContext";
import { UserPoemsProvider } from "@/features/poem/context/UserPoemsContext";
import { ThemeContextProvider } from "@/features/theme/context/ThemeContext";
import { SeasonProvider } from "@/features/tree-animation/contexts/SeasonContext";

interface ClientProvidersProps {
	children: React.ReactNode;
}

const ClientProviders: React.FC<ClientProvidersProps> = ({ children }) => {
	return (
		<SessionProvider>
			<UserProvider>
				<UserPoemsProvider>
					<SeasonProvider>
						<ThemeContextProvider>{children}</ThemeContextProvider>
					</SeasonProvider>
				</UserPoemsProvider>
			</UserProvider>
		</SessionProvider>
	);
};

export default ClientProviders;
