"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setIsError("Email is required.");
    } else {
      try {
        const response = await fetch("/api/forgotpassword", { method: "POST", body: JSON.stringify({ email }) });
        setFormSubmitted(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full p-5 md:p-0 md:w-1/3 mt-10 flex flex-col justify-center rounded">
      {isError && <div className="text-red-500 mb-5 self-center">{isError}</div>}

      {
        formSubmitted ?
        <div className="font-semibold flex flex-col w-full p-5 grow items-center text-center">An email has been sent to the provided email if there is an account associated with it.</div>
        :
        <>
          <div className="flex flex-col w-full justify-center mb-10">
            <input className="h-10 p-1 rounded border border-black" type="text" placeholder="Enter Email" onChange={(event) => setEmail(event.target.value)} value={email} />
          </div>
          <button onClick={handleSubmit} className="bg-black rounded h-10 text-lg text-white mb-5">Submit</button>
        </>
      }
    </div>
  );
}

export default ForgotPasswordForm;