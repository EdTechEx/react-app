// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)
//
// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-219&mode=design&t=0FIG0iRzKcD0s16M-0
// // * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-257&mode=design&t=0FIG0iRzKcD0s16M-0
// // * render this component by route '/registration'
// // * submit form data and make POST API request '/registration'.
// // * after successful registration navigates to '/login' route.
// // * component should have a link to the Login page (see design)
// // ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#registration-new-component
//
import React, { useState } from "react";

import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../common";
import { createUser } from "../../services";

const defaultState = {
  email: "",
  name: "",
  password: "",
};

const parseErrors = (errorsArray) => {
  const errorFields = {
    email: "",
    name: "",
    password: "",
  };

  errorsArray.forEach((error) => {
    if (error.includes("'email'")) {
      errorFields.email = error;
    } else if (error.includes("'name'")) {
      errorFields.name = error;
    } else if (error.includes("'password'")) {
      errorFields.password = error;
    }
  });

  return errorFields;
};

export const Registration = () => {
  const [formData, setFormData] = useState(defaultState);
  const [errors, setErrors] = useState(defaultState);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(defaultState);

    let newErrors = { ...defaultState };
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    try {
      const response = await createUser(formData);

      if (response?.errors) {
        setErrors(parseErrors(response.errors || []));
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h1>Registration</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Input
            labelText="Name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            placeholderText="Input text"
            error={errors.name}
          />
          <Input
            labelText="Email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            placeholderText="Input text"
            error={errors.email}
          />
          <Input
            labelText="Password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            placeholderText="Input text"
            error={errors.password}
          />
          <Button buttonText="Register" type="submit" />
        </form>
        <p>If you have an account you may {<Link to={"/login"}>Login</Link>}</p>
      </div>
    </div>
  );
};
