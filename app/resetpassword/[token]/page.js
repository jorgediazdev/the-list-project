"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/components/ResetPasswordForm";

const ResetPasswordPage = ({ params }) => {
  const router = useRouter();
  const token = params.token;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchTokenInformation = async () => {
      try {
        const response = await fetch(`/api/forgotpassword/?token=${token}`);
        const results = await response.json()

        if (!results.success) {
          setIsError(results.message);
        } else {
          setUserId(results.userId);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchTokenInformation();
  }, [])

  return (
    <div className="flex flex-col items-center">
      {
        isError ?
        <div className="font-semibold flex flex-col w-full p-5 grow items-center text-center mt-10">{isError}</div>
          :
          !isLoading &&
          <>
            <h1 className="mt-10 text-3xl font-bold">Reset Password</h1>
            <ResetPasswordForm userId={userId} />
          </>
      }
    </div>
  );
}

export default ResetPasswordPage;