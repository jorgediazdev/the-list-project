import { connectToDB } from "@/db";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";
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

export const PATCH = async (req, res) => {
  const body = await req.json()
  const userId = body.userId;
  const password = body.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(userId, { password: hashedPassword });

  if (user) {
    return new Response(JSON.stringify({ success: true }));
  } else {
    return new Response(JSON.stringify({ success: false, message: "Something went wrong." }));
  }
}