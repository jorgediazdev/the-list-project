"use client";

import { useEffect } from "react";
import RegisterForm from "@/components/RegisterForm";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session?.user) {
			router.push("/");
		}
	}, [session])

	return (
		<div className="flex flex-col items-center">
			<FaUserCircle className="mt-10 mb-1" size={50} />
			<h1 className="text-3xl font-bold">Please Register</h1>
			<RegisterForm />
		</div>
	);
}

export default Register;