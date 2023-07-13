"use client";

import Item from "./Item";
import ItemForm from "./ItemForm";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ItemList = ({ setShowItemForm, showItemForm, session, setItemFormAction, itemFormAction, selectedList, setFormTitle }) => {
  const [items, setItems] = useState([]);
  const listId = useSearchParams().get("listId") || session?.user.id;
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`/api/items/?listId=${listId}`,);

      const items = await response.json();

      setItems(items);
    }

    fetchItems();
  }, [session, listId]);

  useEffect(() => {

  }, [items]);

  return (
    <>
      {
        session?.user.id !== listId
        ?
        <Link className="flex items-center mt-5 font-semibold bg-orange-300 rounded-lg p-1" href={"/"}>
          <span className="mr-1">Back To My List</span>
          <AiOutlineArrowLeft />
        </Link>
        :
        showItemForm && <ItemForm setFormTitle={setFormTitle} itemToEdit={itemToEdit} setShowItemForm={setShowItemForm} setItems={setItems} action={itemFormAction} />
      }

      <div className={`${items.length < 1 && "items-center"} item-list mt-5 flex flex-col w-full md:w-2/4 grow overflow-auto`}>
        {
          items.length < 1
            ?
            <span className="mt-24 font-semibold text-xl text-blue-700">{session?.user.name === selectedList.owner ? "You have no items added." : `${selectedList.owner} has no items added.`}</span>
            :
            items && items.map((item, index) => {
              return <Item setItemFormAction={setItemFormAction} setShowItemForm={setShowItemForm} setItemToEdit={setItemToEdit} setItems={setItems} key={item._id} id={item._id} item={item} index={index} listId={listId} />
            })
        }
      </div>
    </>
  );
}

export default ItemList;