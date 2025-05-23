// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * add functionality to create new course with:
// //   ** title
// //   ** description
// //   ** duration (user enters in minutes, you should map in format «hh:mm»)
// //   ** existing authors (use 'authorsList' prop)
// //   ** new created author (create field and button, update 'authorsList')
// //   ** user should be able to remove author from the course
// //   ** add validation to the fields
// //   ** add new course to the 'coursesList' and navigate to the '/courses' page => new course should be in the courses list
// // ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#add-new-course

// // Module 3.
// // * remove props - authorsList, createCourse, createAuthor
// // * use selector from store/selectors.js to get authorsList from store
// // * save new course to the store. Use action 'saveCourse' from 'src/store/slices/coursesSlice'
// // * save new author to the store. Use action 'saveAuthor' from 'src/store/slices/authorsSlice'
// // ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#add-new-course

// // Module 4.
// // * render this component only for ADMIN user
// // * in this module you should separate functionality for this component:
// //   ** create mode:
// //     * form for the course creation should be opened by 'courses/add' route by 'ADD NEW COURSE' button click (as before)
// //     * make a request to save new course
// //     * use 'createCourse' service from 'src/services.js' and 'createCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
// //     * use 'createAuthor ' service from 'src/services.js' and 'createAuthorThunk' thunk from 'src/store/thinks/authorsThunk.js'
// //     * save new course to the store after success response
// // ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-4/home-task/components#add-new-course
// //   ** update mode:
// //     * form should be opened by route '/courses/update/:courseId' route by 'update' button click
// //     * appropriate forms field should be prefilled with course's info
// //     * user should have ability to modify course information in the fields and change authors list
// //     * make a request to save updated course
// //     * use 'updateCourseService' from 'src/services.js' and 'updateCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
// //     save updated course to the store after success response.
// // ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-4/home-task/components#update-course

// // Module 5:
// // * proposed cases for unit tests:
// //   ** CourseForm should show authors lists (all and course authors).
// //   **  CourseForm 'Create author' button click should call dispatch.
// //   **  CourseForm 'Add author' button click should add an author to the course authors list.
// //   **  CourseForm 'Delete author' button click should delete an author from the course list.

import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";
import { Button, Input } from "../../common";
import { AuthorItem, CreateAuthor } from "./components";
import { getCourseDuration, getCurrentDate } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorsSelector } from "../../store/selectors";
import { saveCourse } from "../../store/slices/coursesSlice";
// import { saveAuthor } from "../../store/slices/authorsSlice";

const filterById = (courseAuthors, authors) => {
  const ids = new Set(courseAuthors.map((item) => item.id));
  return authors.filter((item) => !ids.has(item.id));
};

const courseInitialData = {
  title: "",
  description: "",
  duration: 0,
  authors: [],
  id: "",
};

export const CourseForm = ({ action }) => {
  const [courseData, setCourseData] = useState(courseInitialData);
  const [courseAuthors, setCourseAuthors] = useState([]);
  const [formError, setFormError] = useState({});
  const authorsList = useSelector(getAuthorsSelector);
  const dispatch = useDispatch();

  const [authors, setAuthors] = useState(() =>
    filterById(courseAuthors, authorsList)
  );

  const navigate = useNavigate();

  useEffect(() => {
    setAuthors(filterById(courseAuthors, authorsList));
  }, [authorsList, courseAuthors]);

  const handleCreateCourse = (e) => {
    e.preventDefault();

    setFormError({});

    let formErrors = {};

    if (!courseData.title.trim()) {
      formErrors.title = "Title is required";
    }

    if (!courseData.description.trim()) {
      formErrors.description = "Description is required";
    }

    if (courseData.duration <= 0) {
      formErrors.duration = "Duration is required";
    }

    if (courseAuthors.length === 0) {
      formErrors.authors = "At least one author is required";
    }

    if (Object.keys(formErrors).length > 0) {
      setFormError(formErrors);
      return;
    }

    dispatch(
      saveCourse({
        ...courseData,
        authors: courseAuthors.map((author) => author.id),
        id: String(Date.now()),
        creationDate: getCurrentDate(),
      })
    );

    navigate("/courses");
  };

  const filterAuthors = (author) => {
    setCourseAuthors((prevCourseAuthors) => {
      if (prevCourseAuthors.some((a) => a.id === author.id)) {
        setAuthors((prevAuthors) => [...prevAuthors, author]);

        return prevCourseAuthors.filter((a) => a.id !== author.id);
      } else {
        setAuthors((prevAuthors) =>
          prevAuthors.filter((a) => a.id !== author.id)
        );

        return [...prevCourseAuthors, author];
      }
    });
  };

  const handleTitleChange = (title) => {
    setCourseData((data) => ({ ...data, title }));
  };

  const handleDescriptionChange = (description) => {
    setCourseData((data) => ({ ...data, description }));
  };

  const handleDurationChange = (minutes) => {
    if (isNaN(minutes)) {
      return;
    }

    setCourseData((courseData) => ({
      ...courseData,
      duration: +minutes,
    }));
  };

  // const onCreateAuthor = (author) => {
  //   dispatch(saveAuthor(author));
  // };

  return (
    <div className={styles.container}>
      <h2>{action === "create" ? "Create page" : "Course edit"}</h2>

      <form>
        <Input
          labelText="Title"
          name="title"
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholderText="Input text"
          data-testid="titleInput"
          value={courseData.title}
          error={formError.title}
        />
        <label>
          Description
          <textarea
            className={styles.description}
            data-testid="descriptionTextArea"
            placeholder="Input text"
            onChange={(e) => handleDescriptionChange(e.target.value)}
            value={courseData.description}
            error={formError.description}
          />
          {formError.description && (
            <span className={styles.error}>{formError.description}</span>
          )}
        </label>
        <div className={styles.infoWrapper}>
          <div>
            <div className={styles.duration}>
              <Input
                labelText="Duration"
                name="title"
                onChange={(e) => handleDurationChange(e.target.value)}
                placeholderText="Input text"
                data-testid="durationInput"
                value={courseData.duration || ""}
                error={formError.duration}
              />
              <p>{getCourseDuration(courseData.duration)}</p>
            </div>
            <h2>Authors</h2>
            <CreateAuthor />
            <div className={styles.authorsContainer}>
              <h3>Authors List</h3>
              <ul>
                {authors.map((author) => (
                  <li key={author.id}>
                    <AuthorItem
                      author={author}
                      isCourseAuthor={false}
                      onClick={filterAuthors}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.courseAuthorsContainer}>
            <h2>Course authors</h2>
            {courseAuthors.length ? (
              <ul>
                {courseAuthors.map((author) => (
                  <li key={author.id}>
                    <AuthorItem
                      author={author}
                      isCourseAuthor={true}
                      onClick={filterAuthors}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.notification}>List is empty</p>
            )}
          </div>
        </div>
      </form>

      <div className={styles.buttonsContainer}>
        <Button buttonText="CANCEL" />
        <Button
          buttonText={`${action} course`}
          data-testid="createCourseButton"
          handleClick={handleCreateCourse}
        />
      </div>
    </div>
  );
};
