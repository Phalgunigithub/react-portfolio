import { useState } from "react";

import "./App.css";
import FormComponent from "./FormComponent";
import DynamicForm from "./components/DynamicForm";

function App() {
  const signInConfig = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  const signUpConfig = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a password",
      required: true,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Re-enter your password",
      required: true,
    },
  ];

  const handleSignInSubmit = (data) => {
    console.log("Sign In Data:", data);
  };

  const handleSignUpSubmit = (data) => {
    console.log("Sign Up Data:", data);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Sign In</h1>

      <DynamicForm config={signInConfig} onSubmit={handleSignInSubmit} />

      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>Sign Up</h1>
      <DynamicForm config={signUpConfig} onSubmit={handleSignUpSubmit} />

      {/* <FormComponent></FormComponent> */}
    </div>
  );
}

export default App;
