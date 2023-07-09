import { getToken } from "next-auth/jwt";
import { connectToDB } from "@/db";
import Item from "@/models/itemModel";

export const GET = async (req, res) => {
  const token = await getToken({ req });
  const userId = token?.sub;

  if (!userId) {
    return new Response("Not authorized.", { status: 401 });
  }

  try {
    await connectToDB();

    const listId = req.nextUrl.searchParams.get("listId");

    console.log(listId);

    const items = await Item.find({ owner: listId });

    return new Response(JSON.stringify(items));
  } catch (error) {

  }
}

export const POST = async (req, res) => {
  const token = await getToken({ req });
  const userId = token?.sub;

  if (!userId) {
    return new Response("Not authorized.", { status: 401 });
  }

  const { title, description, link } = await req.json();

  try {
    await connectToDB();

    const newItem = {
      title,
      description,
      link,
      owner: userId
    };

    const createdItem = await Item.create(newItem);

    return new Response(JSON.stringify(createdItem));
  } catch (error) {
    console.log(error);
    return new Response("Failed to create item.", { status: 500 });
  }
}

export const PATCH = async (req, res) => {
  const token = await getToken({ req });
  const userId = token?.sub;

  if (!userId) {
    return new Response("Not authorized.", { status: 401 });
  }

  const body = await req.json();

  if (body.action === "undo obtained") {
    try {
      await connectToDB();

      const itemUpdates = {
        obtained: body.obtained,
        obtainedBy: null
      };

      const itemToUpdate = await Item.findByIdAndUpdate(body.itemId, itemUpdates, { new: true });

      return new Response(JSON.stringify(itemToUpdate));
    } catch (error) {
      console.log(error);
      return new Response("Failed to update item.", { status: 500 });
    }
  }

  if (body.action === "obtain") {
    try {
      await connectToDB();

      const itemUpdates = {
        obtained: body.obtained,
        obtainedBy: userId
      };

      const itemToUpdate = await Item.findByIdAndUpdate(body.itemId, itemUpdates, { new: true });

      return new Response(JSON.stringify(itemToUpdate));
    } catch (error) {
      console.log(error);
      return new Response("Failed to create item.", { status: 500 });
    }
  }

  try {
    await connectToDB();

    const itemUpdates = body;

    const itemToUpdate = await Item.findByIdAndUpdate(body.itemId, itemUpdates, { new: true });

    return new Response(JSON.stringify(itemToUpdate));
  } catch (error) {
    console.log(error);
    return new Response("Failed to create item.", { status: 500 });
  }
}

export const DELETE = async (req, res) => {
  const token = await getToken({ req });
  const userId = token?.sub;

  if (!userId) {
    return new Response("Not authorized.", { status: 401 });
  }

  try {
    await connectToDB();

    const itemId = req.nextUrl.searchParams.get("itemId");

    await Item.findByIdAndDelete(itemId);

    return new Response(JSON.stringify(itemId));
  } catch (error) {

  }
}