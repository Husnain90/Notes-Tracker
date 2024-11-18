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
    // console.log("the cc", signUpCredentails);

    try {
      // console.log("im the handle submit");

      
      const response = await handleform(signUpCredentails);
      console.log(response)
      if (response?.status === "success") {
        router.push("/auth/signIn");
      } else {
        console.log("here is the response", response?.status);
      }
    } catch (err) {
      console.log("error in the comp", err);
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


// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { Formik } from "formik";
// import { signUpSchema } from "@/validationSchema/schema";

// export default function SignUp() {
//   const router = useRouter();

//   const handleSubmission = async (signUpCredentails: {
//     name: string;
//     email: string;
//     password: string;
//   }) => {
//     console.log("Submitted credentials:", signUpCredentails);

//     try {
//       console.log("Form submission initiated.");
//       // Call your API or action handler here
//       // const response = await handleform(signUpCredentails);

//       // Redirect on success (example)
//       // if (response?.status === "success") {
//       //   router.push("/auth/signIn");
//       // } else {
//       //   console.log("Error response:", response?.status);
//       // }
//     } catch (err) {
//       console.error("Error during form submission:", err);
//     }
//   };

//   return (
//     <Formik
//       initialValues={{
//         name: "",
//         email: "",
//         password: "",
//       }}
//       validationSchema={signUpSchema} // Add the validation schema here
//       onSubmit={handleSubmission}
//     >
//       {({ errors, touched, handleSubmit, handleChange }) => (
//         <form
//           className="flex flex-col w-96 border-2 gap-5 p-4 rounded-md"
//           onSubmit={handleSubmit}
//         >
//           {/* Name Field */}
//           <input
//             name="name"
//             type="text"
//             placeholder="Name"
//             className="p-2 border-2 rounded-md"
//             onChange={handleChange}
//           />
//           {errors.name && touched.name && (
//             <div className="text-red-500">{errors.name}</div>
//           )}

//           {/* Email Field */}
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             className="p-2 border-2 rounded-md"
//             onChange={handleChange}
//           />
//           {errors.email && touched.email && (
//             <div className="text-red-500">{errors.email}</div>
//           )}

//           {/* Password Field */}
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             className="p-2 border-2 rounded-md"
//             onChange={handleChange}
//           />
//           {errors.password && touched.password && (
//             <div className="text-red-500">{errors.password}</div>
//           )}

//           <button type="submit" className="p-3 bg-black text-white rounded-md">
//             Submit
//           </button>
//         </form>
//       )}
//     </Formik>
//   );
// }
