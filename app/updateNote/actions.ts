"use server";

import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { cookies } from "next/headers";

export const getNoteData = async (id: string ) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  };
  try {
    const response = await axiosInstance.get(`/note/${id}`,config)
    if (response.status === 200) {
      return {note: response.data };
    }
  } catch (err) {
 
  }
};

export const updateNotes = async (formData :FormData)=>{

  const title = formData.get("title");
  const content = formData.get("content");
  const category = formData.get("category");
  const id = formData.get("id");


const cookieStore = await cookies();
const token = cookieStore.get("token");
const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token?.value}`,
  },
};

try {
  const response = await axios.put(
    `http://localhost:5000/api/v1/note/${id}`,
    { title, content,category },
    config
  );
  if (response.status === 200) {
    // console.log("the response ", response.status);
   return {updated:true}
  }
} catch (err) {
  return {updated:false}
}
}

