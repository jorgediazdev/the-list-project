"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   return () => {
  //     dispatch(reset());
  //   }
  // }, []);

  const handleLogin = async () => {
    if (!email) {
      setIsError("Email is required.");
    } else if (!password) {
      setIsError("Password is required.");
    } else {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password
      });

      if (result.error) {
        setIsError("Credentials Invald.");
      } else {
        router.push("/");
      }
    }
  }

  return (
    <div className="w-full p-5 md:p-0 md:w-1/3 mt-10 flex flex-col justify-center rounded">
      {isError && <div className="text-red-500 mb-5 self-center">{isError}</div>}

      <div className="flex flex-col w-full justify-center mb-5">
        <input className="h-10 p-1 rounded border border-black" type="text" placeholder="Enter Email" onChange={(event) => setEmail(event.target.value)} value={email} />
      </div>
      <div className="flex flex-col w-full justify-center mb-10">
        <input className="h-10 p-1 rounded border border-black" type="password" placeholder="Enter Password" onChange={(event) => setPassword(event.target.value)} value={password} />
      </div>
      <button onClick={handleLogin} className="bg-black rounded h-10 text-lg text-white mb-5">Login</button>
      <div className="w-full flex justify-between">
        <Link href="/forgotpassword" className="text-blue-700 hover:text-blue-300 hover:cursor-pointer">Forgot Password?</Link>
        <Link href="/register" className="text-blue-700 hover:text-blue-300 hover:cursor-pointer">Don't have an account? Register.</Link>
      </div>
    </div>
  );
}

export default LoginForm;