"use server";

import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { cookies } from "next/headers";

export const createNoteHandler = async (noteData: {
  title: string;
  content: string;
  category: string;
}) => {
  const cookieStore = await cookies();
  const title = noteData.title;
  const content = noteData.content;
  const category = noteData.category;

  const token = cookieStore.get("token");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  };

  try {

    const response = await axiosInstance.post("/note/createNote", {
          title,
          content,
          category,
    },
    config
  );
    if (response.status === 201) {
      return { status: "success", data: response.data };
    }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const errorResponse = err.response.data;
      return { status: "failed ", err: errorResponse.message };
    } else {
    
      return { status: "failed", err: "Unexpected error occurred" };
    }
  }
};
