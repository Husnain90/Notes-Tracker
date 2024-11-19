"use server";

import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { cookies } from "next/headers";

interface ErrorResponse {
  message: string;
}

export const handleLogin = async (credentails: {

  email: string;
  password: string;
}) => {

  const email = credentails.email;
  const password = credentails.password;
  const cookieStore = await cookies()
  try {
    
    const response = await  axiosInstance.post("/auth/login",{
      email,
      password
    })
  



    const data = response.data;
    if(data.token){
      cookieStore.set("token",data.token,{httpOnly :true})
    }


    if (response.status === 200) {
      return { status: "success" , data : response.data };
     
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
