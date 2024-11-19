
import * as Yup from "yup";
export const signUpSchema = Yup.object().shape({
  name: Yup.string().min(2, "To short").max(50, "To long").required("Required"),
  email: Yup.string().email("invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

export const signInSchema = Yup.object().shape({

  email: Yup.string().email("invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
  
});

export const noteSchema = Yup.object().shape({
  title:Yup.string().min(3,"Too short").max(10,"To long").required("Required"),
  content : Yup.string().min(3,"Too short").max(20,"To long").required("Required"),
  category : Yup.string().min(3,"To short").max(20,"To Long").required("Required")
})