import React from "react";

import styles from "./styles.module.css";
import { Logo } from "./components";
import { Button } from "../../common";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserNameSelector,
  getUserTokenSelector,
} from "../../store/selectors";
import { removeUserData } from "../../store/slices/userSlice";
// import { getUserTokenSelector } from "../../store/selectors";

// Module 1:
// * add Logo and Button components
// * add Header component to the App component
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#header

// Module 2:
// * show user's name if he is logged in (use selector from store/selectors.js to get user token from store)
// * navigate to the /login route after 'LOGOUT' button click
// * hide 'LOGOUT' button and user's name for Login and Registration pages
// * remove token from localStorage by LOGOUT button click.
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#header

// Module 3:
// * use selector from store/selectors.js to get user's name from the store
// * remove user's data from the store. Use action 'removeUserData' from the 'src/store/slices/userSlice by LOGOUT button click
// * remove token from localStorage by LOGOUT button click.
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#header

// Module 4:
// make a request to lod out on 'LOGOUT' button click
// use thunk 'logoutThunk' from 'src/store/thunks/userThunk.js' and service 'logout' from 'src/services.js'
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function

// Module 5:
// *proposed cases for unit tests:
//   ** Header should have logo and user's name.

export const Header = () => {
  const token = useSelector(getUserTokenSelector);
  const name = useSelector(getUserNameSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("token");
    dispatch(removeUserData());

    navigate("/login");
  };

  return (
    <div className={styles.headerContainer}>
      <Logo />
      <div className={styles.userContainer}>
        <p className={styles.userName}>{name}</p>
        <Button
          buttonText={token ? "logout" : "login"}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};
