"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const ResetPasswordForm = ({ userId }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!password) {
      setErrorMessage("Password is required.");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
    } else {
      const response = await fetch("/api/user/edit", { method: "PATCH", body: JSON.stringify({ userId, password }) });
      const results = await response.json();

      if (results.success) {
        setSuccessMessage("Your password has been updated.");
      } else {
        console.log(results);
      }
    }
  }

  return (
    <div className="w-full md:w-1/3 mt-10 flex flex-col justify-center rounded p-5 md:p-0">
      {
        successMessage ?
          <div className="mt-10 self-center">{successMessage}</div>
          :
          <>
            {errorMessage && <div className="text-red-500 mb-5 self-center">{errorMessage}</div>}

            <div className="flex flex-col w-full justify-center mb-5">
              <input className="h-10 p-1 rounded border border-black" type="password" placeholder="Enter Password" onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className="flex flex-col w-full justify-center mb-10">
              <input className="h-10 p-1 rounded border border-black" type="password" placeholder="Confirm Password" onChange={(event) => setConfirmPassword(event.target.value)} value={confirmPassword} />
            </div>
            <button onClick={handleSubmit} className="mb-5 bg-black rounded h-10 text-lg text-white">Submit</button>
          </>
      }
    </div>
  );
}

export default ResetPasswordForm;