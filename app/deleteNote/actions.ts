"use server"
import axios from "axios";
import { cookies } from "next/headers";

export const deleteNote = async (id:string)=>{
const cookieStore = await cookies();
const token = cookieStore.get("token");
const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token?.value}`,
  },
};

try {
  const response = await axios.delete(
    `http://localhost:5000/api/v1/note/${id}`,
   
    config
  );
  if (response.status === 200) {
    // console.log("the response ", response.status);
    return { delete: true };
  }
} catch (err) {
  console.error("Error updating the note:", err);
  return { delete: false };
}
}