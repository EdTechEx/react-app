import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setCourses,
  saveCourse,
  deleteCourse,
  updateCourse,
} from "../slices/coursesSlice";
import {
  getCourses,
  createCourse,
  updateCourse as updateCourseApi,
  deleteCourse as deleteCourseApi,
} from "../../services.js";

export const updateCourseThunk = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, data }, { getState }) => {
    const token = getState().auth.token;
    return await updateCourse(id, data, token);
  }
);

export const deleteCourseThunk = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId, { dispatch }) => {
    await deleteCourseApi(courseId);
    dispatch(deleteCourse(courseId));
  }
);

export const createCourseThunk = createAsyncThunk(
  "courses/createCourse",
  async (newCourseData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No auth token found");
      }

      const hours = Math.floor(newCourseData.duration / 60)
        .toString()
        .padStart(2, "0");
      const minutes = (newCourseData.duration % 60).toString().padStart(2, "0");

      const formattedCourse = {
        ...newCourseData,
        duration: `${hours}:${minutes}`,
        authors: newCourseData.authors,
      };

      const response = await createCourse(formattedCourse, token);

      return response.data || response;
    } catch (error) {
      console.error("Error in createCourseThunk:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCoursesThunk = createAsyncThunk(
  "courses/getCourses",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await getCourses();
      if (!response.successful) {
        return rejectWithValue(response.errors || "Failed to fetch courses");
      }
      dispatch(setCourses(response.result));
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
