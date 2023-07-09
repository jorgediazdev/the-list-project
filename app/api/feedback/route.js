import { getToken } from "next-auth/jwt";
import Feedback from "@/models/feedbackModel";
import { connectToDB } from "@/db";

export const POST = async (req, res) => {
  const token = await getToken({ req });
  const userId = token?.sub;

  if (!userId) {
    return new Response("Not authorized.");
  }

  const body = await req.json();

  try {
    await connectToDB();

    await Feedback.create({
      type: body.feedbackType,
      message: body.message
    });

    return new Response(JSON.stringify("Feedback submitted."));
  } catch (error) {
    console.log(error)
  }
}