"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {

  }, []);

  const handleRegister = async () => {
    if (!newUser.name) {
      setIsError(true);
      setErrorMessage("Name is required.");
    } else if (!newUser.email) {
      setIsError(true);
      setErrorMessage("Email is required.");
    } else if (!newUser.password) {
      setIsError(true);
      setErrorMessage("Password is required.");
    } else {
      const result = await signIn("credentials", {
        redirect: false,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
      });

      if (result.error) {
        setErrorMessage(result.error);
      } else {
        router.push("/");
      }
    }
  }

  return (
    <div className="w-full md:w-1/3 mt-10 flex flex-col justify-center rounded p-5 md:p-0">
      {errorMessage && <div className="text-red-500 mb-5 self-center">{errorMessage}</div>}
      <div className="flex flex-col w-full justify-center mb-5">
        <input className="h-10 p-1 rounded border border-black" type="text" placeholder="Enter Name" onChange={(event) => setNewUser({ ...newUser, name: event.target.value })} value={newUser.name} />
      </div>
      <div className="flex flex-col w-full justify-center mb-5">
        <input className="h-10 p-1 rounded border border-black" type="text" placeholder="Enter Email" onChange={(event) => setNewUser({ ...newUser, email: event.target.value })} />
      </div>
      <div className="flex flex-col w-full justify-center mb-10">
        <input className="h-10 p-1 rounded border border-black" type="password" placeholder="Enter Password" onChange={(event) => setNewUser({ ...newUser, password: event.target.value })} />
      </div>
      {/* <div className="flex flex-col w-full justify-center">
                <div className="flex flex-col w-full justify-center">
                    <input className="h-10 p-1 rounded border border-black" type="password" placeholder="Confirm Password" onChange={(event) => setPassword(event.target.value)} value={password} />
                </div>
            </div> */}
      <button onClick={handleRegister} className="mb-5 bg-black rounded h-10 text-lg text-white">Submit</button>
      <div className="w-full flex justify-end">
        <Link href="/api/auth/signin" className="text-blue-700 hover:text-blue-300 hover:cursor-pointer">Already have an account? Login.</Link>
      </div>
    </div>
  );
}

export default RegisterForm;