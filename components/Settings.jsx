"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Settings = ({ setShowSettings }) => {
  const { data: session } = useSession();

  return (
    <>
      <div onClick={() => setShowSettings(false)} className="absolute w-full h-full top-0 left-0 bg-black z-10 opacity-50" />
      <div onClick={(event) => event.stopPropagation()} className="flex flex-col p-4 bg-white z-10 opacity-100 w-11/12 md:w-1/3 h-2/4 rounded shadow-sm shadow-black absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        <div className="flex justify-center mb-5"><h1 className="text-lg font-semibold">User Profile</h1></div>

        <p className="mb-1">Name: {session?.user.name}</p>
        <p className="mb-1">Email: {session?.user.email}</p>

        <button className="self-center mt-20 bg-red-500 px-5 rounded font-semibold" onClick={signOut}>Logout</button>
      </div>
    </>
  );
}

export default Settings;