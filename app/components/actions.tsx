"use server";

import axios from "axios";
import { cookies } from "next/headers";
export const fetchNotes = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

//   console.log(token?.value);

  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/note/getNotes",
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    console.log(data);
    if (data.succes === true) {
      console.log(data.notes);
      return data.notes;
    }
  } catch (err) {
    return { success: "false", message: "failed to fetch the data" };
  }
};
