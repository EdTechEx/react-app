// This component shows information about the current chosen course.

// Module 1.
// * Use template to show course's information:
// ** ID of course;
// ** Title;
// ** Description;
// ** Duration;
// ** List of authors;
// ** Creation date;
// * use <Button /> component to replace CourseInfo component with Courses component
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#course-info

// Module 2.
// * render component by route '/courses/:courseId'
// * use 'useParam' hook to get course id, remove prop 'showCourseId'
// * remove 'onBack' prop
// * use '<Link />' instead <Button /> component for 'BACK' button
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#course-info

// Module 3.
// * remove props 'coursesList', 'authorsList'
// * use selectors from store/selectors.js to get coursesList, authorsList from store

import React from "react";
import { formatCreationDate, getCourseDuration } from "../../helpers";
import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { getAuthorsSelector, getCoursesSelector } from "../../store/selectors";
import { useSelector } from "react-redux";

export const CourseInfo = () => {
  const { courseId } = useParams();
  const coursesList = useSelector(getCoursesSelector);
  const authorsList = useSelector(getAuthorsSelector);

  const { title, description, duration, creationDate, authors, id } =
    coursesList.find((course) => course.id === courseId);
  const authorsNamesList = authors.map((id) =>
    authorsList.find((obj) => obj.id === id)
  );

  return (
    <div className={styles.container} data-testid="courseInfo">
      <h1>{title}</h1>
      <div className={styles.courseInfo}>
        <p className={styles.description}>{description}</p>
        <div>
          <p>
            <b>ID: </b>
            {id}
          </p>
          <p>
            <b>Duration: </b>
            {getCourseDuration(duration)}
          </p>
          <p>
            <b>Created: </b>
            {formatCreationDate(creationDate)}
          </p>
          <div style={{ display: "flex" }}>
            <b>Authors:&nbsp;</b>
            <ul className={styles.authorsList}>
              {authorsNamesList.map((author) => (
                <li key={author.id}>{author.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.backButton}>
        <Link className="link-button" to={"/courses"}>
          Back
        </Link>
      </div>
    </div>
  );
};
