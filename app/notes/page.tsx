import React from "react";
import Notes from "../components/Notes";
import Link from "next/link";
const Page = () => {
  return (
    <div className="flex flex-col h-screen m-3 ">
      <Link
        href="/createNotes"
        className="bg-black text-white p-2 rounded-md w-[150px] h-[50px] flex justify-center items-center"
      >Create Note</Link>
      <h2 className="text-xl font-bold  mt-3">Your notes </h2>
      <Notes />
    </div>
  );
};

export default Page;
