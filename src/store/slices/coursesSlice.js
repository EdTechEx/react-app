import { createSlice } from "@reduxjs/toolkit";
import {
  createCourseThunk,
  deleteCourseThunk,
  getCoursesThunk,
  updateCourseThunk,
} from "../thunks/coursesThunk";

const initialState = {
  coursesList: [],
  loading: false,
  error: null,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload }) => {
      state.coursesList = payload;
    },
    saveCourse: (state, { payload }) => {
      state.coursesList.push(payload);
    },
    deleteCourse: (state, { payload }) => {
      state.coursesList = state.coursesList.filter(
        (course) => course.id !== payload
      );
    },
    updateCourse: (state, { payload }) => {
      state.coursesList = state.coursesList.map((course) =>
        course.id === payload.id ? { ...course, ...payload } : course
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoursesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoursesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.coursesList = action.payload;
      })
      .addCase(getCoursesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCourseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.coursesList.push(action.payload.result);
      })
      .addCase(createCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCourseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCourse = action.payload;
        state.coursesList = state.coursesList.map((course) =>
          course.id === updatedCourse.id ? updatedCourse : course
        );
      })
      .addCase(updateCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCourseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.coursesList = state.coursesList.filter(
          (course) => course.id !== action.payload
        );
      })
      .addCase(deleteCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCourses, saveCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
