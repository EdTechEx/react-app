import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { CourseCard } from "./components";
import { EmptyCourseList } from "./components/EmptyCourseList/EmptyCourseList";
import { SearchBar } from "../SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorsSelector, getCoursesSelector } from "../../store/selectors";
import { deleteCourse } from "../../store/slices/coursesSlice";

// Module 1:
// * render list of components using 'CourseCard' component for each course
// * render 'ADD NEW COURSE' button (reuse Button component)
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#courses-component
// * render EmptyCourseList component when no courses
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#emptycourselist-component
// * DO NOT map authors to the course inside Courses.jsx component (DO it inside CourseCard)

// Module 2:
// * render this component by route '/courses'
// * navigate to this component if 'localStorage' contains user's token
// * navigate to the route courses/add by clicking 'Add New Course' button, use 'Link' component from 'react-router-dom'
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#courses

// Module 3:
// * stop using mocked courses and authors data
// * delete props 'coursesList' and 'authorsList'
// * use useSelector to get courses and authors from the store
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#courses-component

// Module 4:
// navigate to '/courses/add' route by clicking 'ADD NEW COURSE' button in the 'EmptyCourseList'.
// show message 'You don't have permissions to create a course. Please log in as ADMIN' by clicking ADD NEW COURSE button in the 'EmptyCourseList'.
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-4/home-task/components#emptycourselist-component

// Module 5:
// * proposed cases for unit tests:
//   ** Courses should display amount of CourseCard equal length of courses array.
//   ** CourseForm should be shown after a click on the "Add new course" button.

export const Courses = () => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const coursesList = useSelector(getCoursesSelector);
  const authorsList = useSelector(getAuthorsSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredCourses(coursesList);
  }, [coursesList]);

  const handleShowCourse = (courseId) => {
    navigate(`./${courseId}`);
  };

  const handleDelete = (courseId) => {
    dispatch(deleteCourse(courseId));
  };

  if (!filteredCourses.length) {
    return <EmptyCourseList />;
  }

  return (
    <>
      <div className={styles.panel}>
        <SearchBar
          courses={coursesList}
          onSearchResults={(filteredCourses) =>
            setFilteredCourses(filteredCourses)
          }
        />
        <Link className="link-button" to={"/courses/add"}>
          Add new course
        </Link>
      </div>
      <ul className={styles.coursesList}>
        {filteredCourses.map((course) => (
          <li key={course.id}>
            <CourseCard
              course={course}
              handleShowCourse={handleShowCourse}
              handleDelete={handleDelete}
              authorsList={authorsList}
            ></CourseCard>
          </li>
        ))}
      </ul>
    </>
  );
};
