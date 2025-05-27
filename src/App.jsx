import React, { useEffect } from "react";
import styles from "./App.module.css";
import {
  CourseForm,
  CourseInfo,
  Courses,
  Header,
  Login,
  Registration,
} from "./components";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "./services.js";
import { getAuthors } from "./services";
import { setCourses } from "./store/slices/coursesSlice";
import { setAuthors } from "./store/slices/authorsSlice";
import { getUserTokenSelector } from "./store/selectors.js";
import { getAuthorsThunk } from "./store/thunks/authorsThunk";
import { getCoursesThunk } from "./store/thunks/coursesThunk";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";

// Module 1:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * add next components to the App component: Header, Courses and CourseInfo
// * pass 'mockedAuthorsList' and 'mockedCoursesList' to the Courses and CourseInfo components
// * use hook useState for saving selected courseId [showCourseId, handleShowCourse]

// Module 2:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * remove useState for selected courseId
// * use hook useState for storing list of courses and authors
// * import Routes and Route from 'react-router-dom'
// * Add Routes to the container div (do not include Header to the Routes since header will not be changed with pages)
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#add-the-router-to-the-app-component

// Module 3:
// * the App component and BrowserRouter components should be wrapped with Redux 'Provider' in src/index.js
// * remove 'mockedAuthorsList' and 'mockedCoursesList' constants amd import and their use throughout the project
// * use selector from store/selectors.js to get user token from store
// * get courses and authors from the server. Use courses/all and authors/all GET requests.
// * save courses and authors to the store. Use 'setCourses' and 'setAuthors' actions from appropriate slices here 'src/store/slices'
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#app-component

// Module 4:
// * rewrite old GET requests /courses/all with 'getCoursesThunk' from 'src/store/thunks/coursesThunk.js' using getCourses service from 'src/services.js'.
// * rewrite old GET requests /authors/all with 'getAuthorsThunk' from 'src/store/thunks/authorsThunk.js' using getAuthors service from 'src/services.js'.
// * wrap 'CourseForm' in the 'PrivateRoute' component
// * get authorized user info by 'user/me' GET request if 'localStorage' contains token

function App() {
  const token = useSelector(getUserTokenSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // const fetchInitData = async () => {
  //   const courses = await getCourses();
  //   const authors = await getAuthors();

  //   dispatch(setCourses(courses.result));
  //   dispatch(setAuthors(authors.result));
  // };

  useEffect(() => {
    console.log("Поточний шлях:", location.pathname);
    console.log("Token у useEffect навігації:", token);

    if (
      !token &&
      location.pathname !== "/login" &&
      location.pathname !== "/registration"
    ) {
      console.log('Перенаправлення на /login');
      navigate("/login");
    }
    if (token && location.pathname === "/") {
      console.log('Перенаправлення на /courses');
      navigate("/courses");
    }
  }, [location.pathname, navigate, token]);

  useEffect(() => {
    if (!token) {
      console.log("Token відсутній у useEffect");
      return;
    }

    console.log("Token наявний у useEffect:", token);

    dispatch(getCoursesThunk());
    dispatch(getAuthorsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={token ? <Courses /> : <Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:courseId" element={<CourseInfo />} />

          <Route element={<PrivateRoute />}>
            <Route
              path="courses/add"
              element={<CourseForm action="Create" />}
            />
            <Route
              path="courses/update/:courseId"
              element={<CourseForm action="Update" />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
