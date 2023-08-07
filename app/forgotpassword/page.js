"use client";

import { useEffect } from "react";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ForgotPasswordPage = () => {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session?.user) {
			router.push("/");
		}
	}, [session]);

	return (
		<div className="flex flex-col items-center">
			<h1 className="mt-10 text-3xl font-bold">Forgot Password</h1>
			<ForgotPasswordForm />
		</div>
	);
}

export default ForgotPasswordPage;