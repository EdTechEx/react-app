import { createSlice } from "@reduxjs/toolkit";
import { createCourseThunk, updateCourseThunk } from "../thunks/coursesThunk";

const initialState = [];

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload }) => payload,
    saveCourse: (state, { payload }) => [...state, payload],
    deleteCourse: (state, { payload }) =>
      state.filter((course) => course.id !== payload),
    updateCourse: (state, { payload }) =>
      state.map((course) =>
        course.id === payload.id ? { ...course, ...payload } : course
      ),
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.coursesList.push(action.payload);
      })
      .addCase(createCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCourses, saveCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
