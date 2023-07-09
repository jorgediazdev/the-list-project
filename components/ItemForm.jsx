"use client";

import { useEffect, useRef, useState } from "react";

const ItemForm = ({ setShowItemForm, setItems, action, itemToEdit, setFormTitle }) => {
  const ref = useRef(null);
  const [itemName, setItemName] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  useEffect(() => {
    if (action === "edit") {
      setFormTitle("Edit Item");
    }
  }, []);

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  }

  const handleItemDescriptionChange = (event) => {
    setItemDescription(event.target.value);
  }

  const handleItemLinkChange = (event) => {
    setItemLink(event.target.value);
  }

  const handleCancelOnClick = () => {
    setShowItemForm(false);
    setFormTitle("Add Item");
  }

  const handleAddOnClick = async () => {
    if (itemName) {
      const item = { title: itemName, link: itemLink || null, description: itemDescription || null };

      try {
        const response = await fetch("/api/items", { method: "POST", body: JSON.stringify(item) });
        const newItem = await response.json();

        setItems((prevState) => [...prevState, newItem]);

        setItemName("");
        setItemDescription("");
        setItemLink("");

        ref.current.focus();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleEditClick = async () => {
    const item = { itemId: itemToEdit._id, title: itemName || itemToEdit.title, link: itemLink || itemToEdit.link || null, description: itemDescription || itemToEdit.description || null };
    try {
      const response = await fetch("/api/items", { method: "PATCH", body: JSON.stringify(item) });
      const newItem = await response.json();

      setItems((prevState) => {
        const index = prevState.findIndex((item) => item._id == newItem._id);
        const updatedItems = prevState.filter((item) => item._id !== newItem._id);
        updatedItems.splice(index, 0, newItem);
        return updatedItems;
      });

      setShowItemForm(false);
      setFormTitle("Add Item");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full md:w-2/4 flex flex-col items-center p-1 sticky top-0 bg-white rounded">
      <div className="flex flex-col w-full mb-2">
        {/* {errorMessage && <small className="text-red-700">{errorMessage}</small>} */}
        <label htmlFor="name" className="font-bold">Item</label>
        <input ref={ref} className="w-full h-10 p-1 rounded border border-black mb-2" type="text" name="name" id="name" placeholder={`${action === "edit" ? itemToEdit.title : "Item Name"}`} onChange={handleItemNameChange} value={itemName} />
        <label htmlFor="link" className="font-bold">Link</label>
        <input className="w-full h-10 p-1 rounded border border-black mb-2" type="text" name="link" id="link" placeholder={`${action === "edit" ? itemToEdit.link : "http://example.com"}`} onChange={handleItemLinkChange} value={itemLink} />
        <label htmlFor="description" className="font-bold">Short Description</label>
        <textarea className="w-full p-1 border border-black resize-none my-1 h-14 rounded" name="description" id="description" placeholder={`${action === "edit" ? itemToEdit.description || "" : "e.g. color or size"}`} onChange={handleItemDescriptionChange} value={itemDescription}></textarea>
      </div>
      <div className="flex justify-evenly border-black w-full">
        <button onClick={action === "add" ? handleAddOnClick : handleEditClick} className="h-10 w-2/5 md:w-20 border border-black rounded bg-black text-white">{action === "add" ? "Add" : "Edit"}</button>
        <button onClick={handleCancelOnClick} className="h-10 w-2/5 md:w-20 border border-black rounded bg-white">Cancel</button>
      </div>
    </div>
  );
}

export default ItemForm;