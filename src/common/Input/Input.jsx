// Module 1.
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#create-input-component

import React from "react";

import styles from "./styles.module.css";

export const Input = ({
  placeholderText,
  labelText,
  onChange,
  "data-testid": dataTestId,
  name = "",
  error = "",
  value = "",
}) => (
  <label className={styles.label}>
    {labelText}
    <input
      name={name}
      value={value || undefined}
      onChange={onChange}
      placeholder={placeholderText}
      className={styles.input}
      data-testid={dataTestId}
    />
    {error && <span className={styles.error}>{error}</span>}
  </label>
);
