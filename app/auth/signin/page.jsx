"use client";

import LoginForm from "@/components/LoginForm";
import { FaUserCircle } from "react-icons/fa";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
      if (session?.user) {
          router.push("/");
      }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center">
      <FaUserCircle className="mt-10 mb-1" size={50} />
      <h1 className="text-3xl font-bold">Please Login</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;