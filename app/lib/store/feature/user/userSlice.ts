import {createSlice ,PayloadAction} from "@reduxjs/toolkit"

interface userState {
    _id:string,
    name :string ,
    email:string ,
    isAdmin:boolean
}

const initalState: userState = {
  _id: "",
  name: "",
  email: "",
  isAdmin: false,
};

// export const userSlice = createSlice({

// })