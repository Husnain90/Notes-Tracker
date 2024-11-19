"use server";

import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

interface ErrorResponse {
  message: string;
}

export const handleform = async (credentails:{name:string,email:string,password:string}) => {

const name = credentails.name
const email = credentails.email
const password = credentails.password
  try {
 
    const response: { status: number; message: string } =  await axiosInstance.post("/auth/register",{
      name,
      email,
      password
    })
    
    


    if (response.status === 201) {
      return { status: "success" };
    }
  

   
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      
      const errorResponse = err.response.data as ErrorResponse;

      return { status: "failed ", err: errorResponse.message };
    } else {

      return { status: "failed", err: "Unexpected error occurred" };
    }
  }
};
