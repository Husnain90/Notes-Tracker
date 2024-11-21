"use client";
import { getNoteData } from "@/app/updateNote/actions";
import React, { useEffect, useState } from "react";
import { deleteNote } from "../actions";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface DataType {
  title: string;
  content: string;
  category: string;
}
const page = () => {
    const router = useRouter();

  const { id } = useParams();
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id === "string") {
        const fetchedData = await getNoteData(id);
        setData(fetchedData?.note.data);
      }
    };
    fetchData();
  }, [id]);
  const handleDelete = async () => {
    try {
      if (typeof id === "string") {
        const deletedNote = await deleteNote(id);
        if (deletedNote?.delete === true) {
            router.push("/notes");
        }
        else
        {
           
        }
      }
    } catch( err){
        
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className=" w-64">
        <p className="text-lg font-bold">Title</p>
        <p>{data?.title}</p>
        <p className="text-lg font-bold">Content</p>
        <p>{data?.content}</p>
        <p className="text-lg font-bold">Category</p>
        <p>{data?.category}</p>
        <div className="flex flex-1 justify-center">
          <button
            onClick={handleDelete}
            className=" flex  bg-red-600 h-7 w-36 rounded-md mt-7 items-center justify-center text-white"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
