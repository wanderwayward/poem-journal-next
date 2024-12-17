"use client";
import { FC } from "react";
import ProtectedRoute from "../_components/ProtectedRoute/ProtectedRoute";
import UserProfile from "@/features/user/components/User";

const UserView: FC = () => {
	return (
		<ProtectedRoute>
			<UserProfile />
		</ProtectedRoute>
	);
};

export default UserView;
