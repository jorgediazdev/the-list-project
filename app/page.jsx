"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import ItemList from "../components/ItemList";
import ListSelector from "../components/ListSelector";

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const listId = searchParams.get("listId") || session?.user.id;
  const [showItemForm, setShowItemForm] = useState(false);
  const [showListSelector, setShowListSelector] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [itemFormAction, setItemFormAction] = useState("");
  const [formTitle, setFormTitle] = useState("Add Item");

  useEffect(() => {
    if (!session?.user && status !== "loading") {
      router.push("/auth/signin");
    }

    const fetchSelectedUser = async () => {
      const response = await fetch(`/api/user/?listId=${listId}`);
      const selectedList = await response.json();

      setSelectedList(selectedList);
    }

    if (session?.user) {
      fetchSelectedUser();
    }
  }, [session, listId]);

  const handleAddItemOnClick = () => {
    setItemFormAction("add");
    setShowItemForm((prevState) => {
      if (prevState === true) {
        setFormTitle("Add Item");
      }

      return !prevState;
    });
  }

  if (session?.user && selectedList) {
    return (
      <div className="flex flex-col items-center h-full p-5">
        {showListSelector && <ListSelector setShowListSelector={setShowListSelector} />}

        <div onClick={() => setShowListSelector(!showListSelector)} className="flex mt-10 hover:cursor-pointer">
          <h1 className="font-extrabold text-3xl">{`${selectedList.owner}'s List`}</h1>
          {/* place-self-start by default, but want to be explicit */}
          <AiFillEdit className="ml-1 place-self-start" />
        </div>
        {
          session?.user && listId === session?.user.id && <div onClick={handleAddItemOnClick} className="flex items-center mt-5 hover:cursor-pointer">
            <button className="flex font-semibold border rounded-lg drop-shadow-md p-1 items-center bg-orange-300">
              <span className="mr-1">{formTitle}</span>
              <AiOutlinePlus />
            </button>
          </div>
        }

        <ItemList setFormTitle={setFormTitle} itemFormAction={itemFormAction} setItemFormAction={setItemFormAction} selectedList={selectedList} showItemForm={showItemForm} setShowItemForm={setShowItemForm} session={session} />
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

export default HomePage;