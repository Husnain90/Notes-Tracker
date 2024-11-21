"use server"
import axiosInstance from "@/utils/axiosInstance";
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
  const response = await axiosInstance.delete(
    `http://localhost:5000/api/v1/note/${id}`,
   
    config
  );
  if (response.status === 200) {
 
    return { delete: true };
  }
} catch (err) {
  return { delete: false };
}
}