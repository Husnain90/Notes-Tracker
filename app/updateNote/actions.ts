"use server";

import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { cookies } from "next/headers";

export const getNoteData = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  };
  try {
    const response = await axiosInstance.get(`/note/${id}`)
    if (response.status === 200) {
      return {note: response.data };
    }
  } catch (err) {
 
  }
};

export const updateNotes = async (formData:FormData)=>{
  return {updated:true}

}