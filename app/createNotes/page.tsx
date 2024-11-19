"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { noteSchema, signUpSchema } from "@/validationSchema/schema";
import { createNoteHandler } from "./actions";

export default function createNote() {
  const router = useRouter();
  const handleSubmission = async (noteData: {
    title: string;
    content: string;
    category: string;
  }) => {
    try {
      console.log("handle submission");
      const data = await createNoteHandler(noteData);
      console.log(data);
      if (data?.status === "success") {
        router.push("/notes");
        
      }
    } catch (err) {
      console.log("error in the comp", err);
    }
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Formik
        initialValues={{
          title: "",
          content: "",
          category: "",
        }}
        validationSchema={noteSchema}
        onSubmit={handleSubmission}
      >
        {({ errors, touched, handleSubmit, handleChange }) => (
          <form
            className="flex flex-col w-96 border-2 gap-5 p-4 rounded-md "
            onSubmit={handleSubmit}
          >
            <input
              name="title"
              type="text"
              placeholder="Title"
              className="p-2 border-2 rounded-md "
              onChange={handleChange}
            />
            {errors.title && touched.title && (
              <div className="text-red-500">{errors.title}</div>
            )}

            <input
              name="content"
              type="text"
              placeholder="Content"
              className="p-2 border-2 rounded-md"
              onChange={handleChange}
            />
            {errors.content && touched.content && (
              <div className="text-red-500">{errors.content}</div>
            )}
            <input
              name="category"
              type="text"
              placeholder="Category"
              className="p-2 border-2 rounded-md"
              onChange={handleChange}
            />
            {touched.category && errors.category && (
              <div className="text-red-500"> {errors.category}</div>
            )}
            <button
              type="submit"
              className="p-3 bg-black text-white rounded-md"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
