import React from "react";

import deleteIcon from "../../../../assets/deleteButtonIcon.svg";
import styles from "./styles.module.css";
import { Button } from "../../../../common";

export const AuthorItem = ({ author, isCourseAuthor, onClick }) => (
  <div className={styles.authorItem} data-testid="authorItem">
    <span>{author.name}</span>
    <Button
      buttonText={
        isCourseAuthor ? <img alt="delete" src={deleteIcon}></img> : "+"
      }
      type="button"
      handleClick={() => onClick(author)}
      data-testid="addAuthor"
    />
  </div>
);
