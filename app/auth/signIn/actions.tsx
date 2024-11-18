"use server";

import axios from "axios";

interface ErrorResponse {
  message: string;
}

export const handleLogin = async (credentails: {

  email: string;
  password: string;
}) => {

  const email = credentails.email;
  const password = credentails.password;
  try {
    const response= await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      {
       
        email,
        password,
      }
    );
    console.log("lets see the status ", response.status);

    console.log(response)

    if (response.status === 200) {
      return { status: "success" , data : response.data };
    }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const errorResponse = err.response.data as ErrorResponse;
      console.log("Error occurred", errorResponse.message);
      return { status: "failed ", err: errorResponse.message };
    } else {
      console.log("Unexpected error", err);
      return { status: "failed", err: "Unexpected error occurred" };
    }
  }
};
