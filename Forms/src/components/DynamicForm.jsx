import React, { useState } from "react";

const DynamicForm = ({ config,onSubmit }) => {
  const [formValues, setformValues] = useState(() =>
    config.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.defaultValue || "" }),
      {}
    )
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const missingFieldsArray = config
      .filter((field) => field.required && !formValues[field.name])
      .map((field) => field.label);

    if (missingFieldsArray.length > 0) {
        alert(`please fill ${missingFieldsArray.join(", ")}`)
        return;
    }
    console.log("Form submitted with values:", formValues);

    onSubmit(formValues);
    setformValues(()=>config.reduce((acc,field)=>({...acc,[field.name]:field.defaultValue || "" }), {}))
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {config.map((field) => (
          <div key={field.name} style={{ marginBottom: "1rem" }}>
            <label
              htmlFor={field.name}
              style={{ display: "block", fontWeight: "bold" }}
            >
              {field.label}{" "}
            </label>
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              placeholder={field.placeholder}
              value={formValues[field.name]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            ></input>
          </div>
        ))}

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default DynamicForm;
