// // Module 1, 2, 3. You don't need to do anything with this component (we had to comment this component for tests)

// // Module 4.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * find example https://ebook.learn.epam.com/react-fundamentals/docs/module-4/private-routes
// // * use 'PrivateRoute' to navigate to the routes:
// //   ** '/courses/add';
// //   ** '/courses/update/:courseId'.
// // ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-4/home-task/components#private-route-new-component

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getUserRoleSelector } from "../../store/selectors.js";

const PrivateRoute = () => {
  const role = useSelector(getUserRoleSelector);

  if (role !== "admin") {
    return <div>Access denied. Admins only.</div>;
  }

  return <Outlet />;
};

export default PrivateRoute;
