import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload }) => {
      return payload;
    },
    saveCourse: (state, { payload }) => {
      return [...state, payload];
    },
    deleteCourse: (state, { payload }) => {
      return state.filter((course) => course.id !== payload);
    },
    updateCourse: (state, { payload }) => {
      //...
    },
  },
});

// use these actions in your components / thunks
export const { setCourses, saveCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;

export default coursesSlice.reducer;
