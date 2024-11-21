import {createSlice ,PayloadAction} from "@reduxjs/toolkit"

interface IuserState {
  userState:{
    _id:string,
    name :string ,
    email:string ,
    role:string
  }

}

const initialState: IuserState = {
  
 userState:{
  _id:"",
    name :"",
    email:"",
    role:"",
 }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state:IuserState, action: PayloadAction<IuserState>) => {
      state.userState = action.payload.userState 
   
    },
  },
});

export default userSlice.reducer
export const {setUser} = userSlice.actions