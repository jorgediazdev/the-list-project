import { getToken } from "next-auth/jwt";
import User from "@/models/userModel";

export const GET = async (req, res) => {
  const token = await getToken({ req });
  const userId = token?.sub;

  if (!userId) {
    return new Response("Not authorized.", { status: 500 });
  }

  const { lists } = await User.findById(userId);

  const friendsAccounts = await User.find({ _id: { $in: lists } }).select("name");

  return new Response(JSON.stringify(friendsAccounts));
}