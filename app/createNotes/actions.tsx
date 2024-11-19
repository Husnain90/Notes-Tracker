"use server";

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
    const response = await axios.post(
      "http://localhost:5000/api/v1/note/createNote",
      {
        title,
        content,
        category,
      },
      config
    );
    console.log("lets see the status ", response.status);

    const data = response.data;

    console.log(data);

    if (response.status === 201) {
      return { status: "success", data: response.data };
    }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const errorResponse = err.response.data;
      console.log("Error occurred", errorResponse.message);
      return { status: "failed ", err: errorResponse.message };
    } else {
      console.log("Unexpected error", err);
      return { status: "failed", err: "Unexpected error occurred" };
    }
  }
};
