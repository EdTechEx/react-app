import { useState } from "react";
import { Button, Input } from "../../common";

import styles from "./styles.module.css";

export const SearchBar = ({ courses, onSearchResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredCourses = query
      ? courses.filter(
          (course) =>
            course.title.toLowerCase().includes(lowerCaseQuery) ||
            course.id.toLowerCase().includes(lowerCaseQuery)
        )
      : courses;
    onSearchResults(filteredCourses);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.inputWrapper}>
        <Input
          labelText=""
          onChange={(e) => setQuery(e.target.value)}
          placeholderText="Input text"
        />
      </div>
      <Button buttonText="Search" handleClick={handleSearch} />
    </div>
  );
};
