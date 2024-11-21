"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { signInSchema } from "@/validationSchema/schema";
import { handleLogin } from "./actions";
import { setUser } from "@/app/lib/store/feature/user/userSlice";
import { useDispatch } from "react-redux";
interface IuserState {
  userState: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

export default function SignIn() {
  const router = useRouter();
  const [wrongInfo, setWrongInfo] = useState(false);
  const dispatch = useDispatch();

  const handleSubmission = async (signUpCredentails: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await handleLogin(signUpCredentails);
      const user: IuserState = {
        userState: {
          _id: response?.data._id,
          name: response?.data.name,
          email: response?.data.email,
          role: response?.data.role,
        },
      };
      console.log("teh user", user);
      dispatch(setUser(user));

      if (response?.status === "success") {
        setWrongInfo(false);
        const role = response.data.role;
        if (role === "user") {
          router.push("/notes");
        } else {
          router.push("/admin");
        }
      } else {
        setWrongInfo(true);
      }
    } catch (err) {}
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={signInSchema}
        onSubmit={handleSubmission}
      >
        {({ errors, touched, handleSubmit, handleChange }) => (
          <form
            className="flex flex-col w-96 border-2 gap-5 p-4 rounded-md "
            onSubmit={handleSubmit}
          >
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="p-2 border-2 rounded-md"
              onChange={handleChange}
            />
            {errors.email && touched.email && (
              <div className="text-red-500">{errors.email}</div>
            )}
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="p-2 border-2 rounded-md"
              onChange={handleChange}
            />
            {touched.password && errors.password && (
              <div className="text-red-500"> {errors.password}</div>
            )}
            <button
              type="submit"
              className="p-3 bg-black text-white rounded-md"
            >
              log In
            </button>
            {wrongInfo && (
              <div className="text-red-500">Invalid email or password</div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
}
