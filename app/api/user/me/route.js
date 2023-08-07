import { connectToDB } from "@/db";
import User from "@/models/userModel";
import { getToken } from "next-auth/jwt";

export const GET = async (req, res) => {
  const token = await getToken({ req });
  const userId = token?.sub;

  if (!userId) {
    return new Response("Not authorized.", { status: 401 });
  }

  try {
    await connectToDB();

    const currentUser = await User.findById(userId);

    return new Response(JSON.stringify(currentUser));
  } catch (error) {
    console.log(error)
    return new Response("Something went wrong.", { status: 500 });
  }
}