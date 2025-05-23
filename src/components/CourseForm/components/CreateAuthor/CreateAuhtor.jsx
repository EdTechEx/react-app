// // Module 1.
// // You don't need this component for Module 1.

// // Module 2.
// // * Uncomment component code with imports
// // * Use this component for author creation functionality
// // * Pass callback 'onCreateAuthor' from CourseForm.jsx to return author's info {id: string, name: string}

// // Module 3.
// // Remove 'onCreateAuthor' from props => use 'dispatch' and 'saveAuthor' from 'authorsSlice.js' to save new author to the store

import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button, Input } from "../../../../common";
import { useDispatch } from "react-redux";
import { saveAuthor } from "../../../../store/slices/authorsSlice";

const generateId = () =>
  `author-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const CreateAuthor = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleCreate = () => {
    if (name.trim().length < 2) {
      setError("Author name must be at least 2 characters");
      return;
    }

    const newAuthor = {
      name,
      id: generateId(),
    };

    dispatch(saveAuthor(newAuthor));
    setName("");
    setError("");
  };

  return (
    <div className={styles.newAuthorContainer}>
      <Input
        labelText="Author Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError("");
        }}
        data-testid="createAuthorInput"
        placeholderText="Input text"
        error={error}
      />
      <Button
        buttonText="create author"
        type="button"
        data-testid="createAuthorButton"
        handleClick={handleCreate}
      />
    </div>
  );
};
