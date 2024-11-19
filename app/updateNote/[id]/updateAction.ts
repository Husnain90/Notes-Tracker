"use server";

import { redirect } from "next/navigation";
import { updateNotes } from "../actions";

export const updateForm = async (formData: FormData): Promise<void> => {
 

  const updateData = await updateNotes(formData)

 
  if(updateData?.updated===true){
    redirect("/notes")
  }
 
};
