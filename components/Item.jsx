"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const Item = ({ item, listId, index, setItems, setShowItemForm, setItemToEdit, setItemFormAction }) => {
  const { data: session } = useSession();

  const handleOnDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item? It may have already been obtained.")) {
      try {
        const response = await fetch(`/api/items/?itemId=${id}`, { method: "DELETE" });

        if (response.ok) {
          setItems((prevState) => prevState.filter((item) => item._id !== id));
        }
      } catch (error) {

      }
    }
  }

  const onEditClick = () => {
    setItemToEdit(item);
    setItemFormAction("edit");
    setShowItemForm(true);
  }

  const onGetClick = async () => {
    try {
      const response = await fetch(`/api/items`, { method: "PATCH", body: JSON.stringify({ obtained: !item.obtained, itemId: item._id, action: "obtain" }) });
      const data = await response.json();

      // setItems((prevState) => {
      //   const updatedItems = prevState.filter((item) => item._id !== data._id);
      //   updatedItems.push(data);
      //   return updatedItems;
      // });

      setItems((prevState) => {
        const index = prevState.findIndex((item) => item._id == data._id);
        const updatedItems = prevState.filter((item) => item._id !== data._id);
        updatedItems.splice(index, 0, data);
        return updatedItems;
      });
      // setItems((prevState) => console.log(prevState));
      // console.log(data)
    } catch (error) {

    }
  }

  const onUndoClick = async () => {
    try {
      const response = await fetch(`/api/items`, { method: "PATCH", body: JSON.stringify({ action: "undo obtained", obtained: !item.obtained, itemId: item._id }) });
      const data = await response.json();

      setItems((prevState) => {
        const index = prevState.findIndex((item) => item._id == data._id);
        const updatedItems = prevState.filter((item) => item._id !== data._id);
        updatedItems.splice(index, 0, data);
        return updatedItems;
      });
      // setItems((prevState) => console.log(prevState));
      // console.log(data)
    } catch (error) {

    }
  }

  return (
    <>
      <div className="px-1 flex items-center min-h-[100px] border-b shrink-0">
        {/* <span>{index + 1}.</span> */}
        <div className="flex flex-col w-1/3">
          <div className={`${item.obtained && session?.user.id !== item.owner && "line-through"} decoration-black`}>{item.title}</div>
          {item.link && <Link href={item.link} target="_blank" className="text-blue-700 hover:text-blue-300 mt-1">Link to Item</Link>}
        </div>
        <div className="flex w-1/3 justify-center">
          <div className="">{item.description}</div>
        </div>
        {
          session?.user && session?.user.id === listId ? <div className="flex w-1/3 justify-center">
            <button onClick={() => handleOnDelete(item._id)} className="p-1 mr-5">Delete</button>
            <button onClick={onEditClick}>Edit</button>
          </div>
            :
            <div className="flex w-1/3 justify-center">
              {
                item.obtainedBy === session?.user.id
                  ?
                  <button onClick={onUndoClick} className="text-black font-semibold border border-red-500 rounded-xl px-5">Undo</button>
                  :
                  <button onClick={onGetClick} className={`${item.obtained && "opacity-50"} text-black font-semibold border border-green-500 rounded-xl px-5`} disabled={item.obtained === true}>Get</button>
              }
            </div>
        }
      </div>
    </>
  );
}

export default Item;