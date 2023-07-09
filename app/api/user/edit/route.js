import { connectToDB } from "@/db";
import { getToken } from "next-auth/jwt";
import User from "@/models/userModel";

export const POST = async (req, res) => {
  const token = await getToken({ req });
  const userId = token?.sub;

  if (!userId) {
    return new Response("Not authorized.");
  }

  const body = await req.json();

  if (body.addFriend) {
    try {
      await connectToDB();

      const listToAdd = await User.findOne({ email: body.email });

      if (listToAdd) {
        await User.updateOne({ _id: userId }, { $push: { lists: listToAdd._id } });

        return new Response(JSON.stringify({ success: true, newList: { name: listToAdd.name, _id: listToAdd._id } }));
      }

      return new Response(JSON.stringify({ success: false, message: "No user found with provided email." }));
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: error.message }));
    }

  }

  return new Response("Not authorized.");
}