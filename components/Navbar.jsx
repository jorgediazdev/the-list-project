"use client";

import Settings from "@/components/Settings";
import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <nav className="flex justify-between px-4 h-[7%] bg-neutral-800 items-center">
      {showSettings && <Settings setShowSettings={setShowSettings} />}
      <Link href="/" className="text-white" >The List Project<br />(v0.2.1-alpha)</Link>
      <div className="flex">
        {session?.user.id && <Link className="text-white" href={"/feedback"}>Feedback</Link>}
        {
          // session?.user.id ? <button onClick={signOut} className="text-white ml-4">Logout</button> : <button onClick={signIn} className="text-white ml-4">Login</button>
        }
        {
          session?.user.id && <div className="ml-4 text-white hover:cursor-pointer" onClick={() => setShowSettings((prevState) => !prevState)}>{session?.user.name}</div>
        }
      </div>
    </nav>
  );
}

export default Navbar;