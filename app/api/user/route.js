import { connectToDB } from "@/db";
import { getToken } from "next-auth/jwt";
import User from "@/models/userModel";
import Item from "@/models/itemModel";

export const GET = async (req, res) => {
  const token = await getToken({ req });
  const userId = token?.sub;

  if (!userId) {
    return new Response("Not authorized.");
  }

  try {
    await connectToDB();

    const listId = await req.nextUrl.searchParams.get("listId");

    const selectedUser = await User.findById(listId);
    const selectedUserItems = await Item.find({ owner: listId });

    return new Response(JSON.stringify({
      owner: selectedUser.name,
      items: selectedUserItems
    }));
  } catch (error) {
    console.log(error);
  }
}