import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ListSelector = ({ setShowListSelector }) => {
  const router = useRouter();
  const [lists, setlists] = useState([]);
  const [email, setemail] = useState("");
  const [flash, setFlash] = useState("");
  const [showFlash, setShowFlash] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      const response = await fetch("/api/user/get-friends");
      const lists = await response.json();

      setlists(lists);
    }

    fetchLists();
  }, []);

  const handleOnClick = (event) => {
    router.push(`/?listId=${event.target.id}`);
    setShowListSelector(false);
  }

  const handleSubmit = async () => {
    setFlash("");
    setIsError(false);
    setShowFlash(false);

    try {
      const response = await fetch("/api/user/edit", { method: "POST", body: JSON.stringify({ email, addFriend: true }) });
      const data = await response.json();

      if (data.success) {
        setlists((prevState) => [...prevState, data.newList]);
        setFlash(`${data.newList.name}'s list has been added.`);
        setShowFlash(true);
      } else {
        setFlash(data.message);
        setIsError(true);
        setShowFlash(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div onClick={() => setShowListSelector(false)} className="absolute w-full h-full top-0 left-0 bg-black z-10 opacity-50"></div>
      <div onClick={(event) => event.stopPropagation()} className="flex flex-col items-center bg-white z-10 opacity-100 w-11/12 md:w-1/3 h-2/4 rounded shadow-md shadow-black absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        <div className="flex w-full justify-evenly p-5">
          <button onClick={handleSubmit} className="h-10 w-20 border border-black rounded bg-black text-white">Add</button>
          <input type="text" className="h-10 p-1 rounded border border-black" placeholder="friend@email.com" value={email} onChange={(event) => setemail(event.target.value)} />
        </div>
        {showFlash && <div className={`${isError ? "text-red-700" : "text-green-700"} text-lg`}>{flash}</div>}
        <div className="flex flex-col w-full h-2/4 p-1 grow">
          <div className="overflow-auto">
            {lists.map((list) => <div className="cursor-pointer mt-2 bg-neutral-800 p-4 rounded hover:cursor-pointer text-white" onClick={handleOnClick} id={list._id} key={list._id}>{list.name}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListSelector;