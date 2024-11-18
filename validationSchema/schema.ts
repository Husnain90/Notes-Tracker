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