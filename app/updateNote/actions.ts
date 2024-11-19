"use server";

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
    console.log(id);
    const response = await axios.get(
      `http://localhost:5000/api/v1/note/${id}`,
      config
    );
    if (response.status === 200) {
      return {note: response.data };
    }

    // return {success:true , data :response.data}
  } catch (err) {
    console.log(err);
  }
};
