"use server";

import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { cookies } from "next/headers";
export const fetchNotes = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");


  try {

    const {data}= await axiosInstance.get("note/getNotes", {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      })

    if (data.succes === true) {
      
      return data.notes;
    }
  } catch (err) {
    return { success: "false", message: "failed to fetch the data" };
  }
};
