"use client";
import React from "react";
import { handleform } from "./actions";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { signUpSchema } from "@/validationSchema/schema";


export default function SignUp() {
  const router = useRouter();
  const handleSubmission = async (signUpCredentails: {
    name: string;
    email: string;
    password: string;
  }) => {


    try {
   

      
      const response = await handleform(signUpCredentails);

      if (response?.status === "success") {
        router.push("/auth/signIn");
      } else {
       alert("not submited error occurs")
      }
    } catch (err) {
     alert("Not submit server down ")
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={signUpSchema}
      onSubmit={handleSubmission}
    >
      {({ errors, touched, handleSubmit, handleChange }) => (
        <form
          className="flex flex-col w-96 border-2 gap-5 p-4 rounded-md "
          onSubmit={handleSubmit}
        >
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="p-2 border-2 rounded-md "
            onChange={handleChange}
          />
          {errors.name && touched.name && (
            <div className="text-red-500">{errors.name}</div>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="p-2 border-2 rounded-md"
            onChange={handleChange}
          />
          {errors.email && touched.email && (<div className="text-red-500">{errors.email}</div>)}
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="p-2 border-2 rounded-md"
            onChange={handleChange}
          />
          {
            touched.password && errors.password && (<div className="text-red-500"> {errors.password}</div>)
          }
          <button type="submit" className="p-3 bg-black text-white rounded-md">
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}

