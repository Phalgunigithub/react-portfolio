import React from "react";
import { useState } from "react";

const FormComponent = () => {
  const [formValues, setformValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues.name || !formValues.email || !formValues.password) {
      alert("all fields are required");
      return;
    }

    console.log("submitted data", formValues);
    setformValues({ name: "", email: "", password: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          placeholder="Enter name"
          value={formValues.name}
          onChange={handleChange}
        ></input>

        <label htmlFor="email">email</label>
        <input
          name="email"
          placeholder="Enter email"
          value={formValues.email}
          onChange={handleChange}
        ></input>

        <label htmlFor="password">password</label>
        <input
          name="password"
          placeholder="Enter password"
          value={formValues.password}
          onChange={handleChange}
        ></input>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default FormComponent;
