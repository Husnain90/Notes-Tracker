"use client";
import React, { useEffect, useState } from "react";
import { fetchNotes } from "./actions";
import Link from "next/link";

interface Notes {
  _id: string;
  title: string;
  content: string;
  category: string;
  admin: string;
}
const Notes = () => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const fetchData = async () => {
    const data = await fetchNotes();
    setNotes(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      { notes &&  notes.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {notes.map((note) => (
            <li key={note._id} className=" flex justify-around ">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold ">Title</h2>
                <h2>{note.title}</h2>
                <h2 className="text-lg font-bold ">Content</h2>
                <p>{note.content}</p>
                <h2 className="text-lg font-bold ">Category</h2>
                <p>{note.category}</p>
              </div>
              <div className=" flex items-center gap-3">
                <Link
                  className="bg-blue-700 w-[100px] rounded-md h-[50px] text-white flex justify-center items-center"
                  href={`/updateNote/${note._id}`}
                >
                  Update
                </Link>
                <Link
                  className="bg-red-600 w-[100px] rounded-md h-[50px] text-white flex justify-center items-center"
                  href={`/deleteNote/${note._id}`}
                >
                  Delete
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No notes avaible </div>
      )}
    </div>
  );
};

export default Notes;
