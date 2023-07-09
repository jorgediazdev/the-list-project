"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FeedbackPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [message, setMessage] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    if (!session?.user && status !== "loading") {
      router.push("/");
    }
  }, [session]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/feedback", { method: "POST", body: JSON.stringify({ feedbackType, message }) });

      setFeedbackSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  }


  if (session?.user) {
    return (
      <div className="flex flex-col items-center h-full p-5">
        <h1 className="text-3xl font-bold mt-10">Feedback</h1>
        {
          feedbackSubmitted
            ?
            <div className="font-semibold flex flex-col w-full p-5 grow items-center text-center">
              Your feedback has been submitted.<br />
              Thank you!
            </div>
            :
            <>
              <div className="flex flex-col w-full md:w-2/4 p-5 grow">
                <div className="flex flex-col w-full">
                  <label className="mb-1 font-semibold" htmlFor="feedback-type">Feedback Type</label>
                  <select defaultValue={feedbackType} onChange={(event) => setFeedbackType(event.target.value)} className="w-full border rounded p-1 border-black" name="feedback-type" id="feedback-type">
                    <option value="suggestion">Suggestion</option>
                    <option value="bug">Report a Bug</option>
                  </select>
                </div>

                <div className="flex flex-col w-full mt-5 h-full">
                  <label className="mb-1 font-semibold" htmlFor="message">Message</label>
                  <textarea className="resize-none border rounded border-black p-1 h-full" name="message" id="message" value={message} onChange={(event) => setMessage(event.target.value)} />
                </div>

                <div className="w-full flex justify-center mt-5">
                  <button onClick={handleSubmit} className="w-full bg-black rounded text-white h-10">Submit</button>
                </div>
              </div>
            </>
        }
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center absolute w-screen h-screen bg-neutral-800 z-10 top-0">
        <span className="text-5xl text-white font-semibold">The List Project</span>
        <span className="text-xl mt-2 text-white">Loading...</span>
      </div>
    );
  }
}

export default FeedbackPage;