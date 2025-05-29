// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2927-216&mode=design&t=0FIG0iRzKcD0s16M-0
// // * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-191&mode=design&t=0FIG0iRzKcD0s16M-0
// // * render this component by route '/login'
// // * use login service to submit form data and make POST API request '/login'.
// // * component should have a link to the Registration page (see design)
// // * save token from API after success login to localStorage.
// // ** PAY ATTENTION ** token should be saved to localStorage inside login handler function after login service response
// // ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#login-new-component

// // Module 3.
// // * use 'setUserData' from 'userSlice.js' to save user's name, token and email to the store after success login.
// // ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#login-component

// // Module 4.
// // * use 'setUserData' from 'userSlice.js' to add user's data to store. (DO NOT use 'user/me' [GET] request)

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button, Input } from "../../common";
import { Link, useNavigate } from "react-router-dom";
import { login, getCurrentUser } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { getUserTokenSelector } from "../../store/selectors";
import { setUserData } from "../../store/slices/userSlice";

const defaultState = {
  email: "",
  password: "",
};

export const Login = () => {
  const [formData, setFormData] = useState(defaultState);
  const [errors, setErrors] = useState(defaultState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(getUserTokenSelector);

  useEffect(() => {
    if (token) {
      navigate("/courses");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await login(formData);

      if (response.errors) {
        const errorObj = {};
        response.errors.forEach((err) => {
          if (err.toLowerCase().includes("email")) errorObj.email = err;
          if (err.toLowerCase().includes("password")) errorObj.password = err;
        });
        setErrors(errorObj);
        return;
      }

      if (response.result) {
        localStorage.setItem("token", response.result);

        const userResponse = await getCurrentUser();
        const user = userResponse.result;
        dispatch(setUserData({ ...user, token: response.result }));

        navigate("/courses");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
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
            type="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            placeholderText="Input text"
            error={errors.password}
          />
          <Button buttonText="login" type="submit" />
        </form>
        <p>
          If you don't have an account you may{" "}
          {<Link to={"/registration"}>Registration</Link>}
        </p>
      </div>
    </div>
  );
};
