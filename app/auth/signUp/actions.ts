"use server";

import axios from "axios";

interface ErrorResponse {
  message: string;
}

export const handleform = async (credentails:{name:string,email:string,password:string}) => {

const name = credentails.name
const email = credentails.email
const password = credentails.password
  try {
    const response : {status :number , message : string} = await axios.post(
      "http://localhost:5000/api/v1/auth/register",
      {
        name,
        email,
        password,
      }
    );
    console.log("lets see the status ", response.status);

    if (response.status === 201) {
      return { status: "success" };
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
