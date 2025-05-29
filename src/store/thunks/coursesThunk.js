import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setCourses,
  deleteCourse,
} from "../slices/coursesSlice";
import {
  getCourses,
  createCourse,
  updateCourse as updateCourseApi,
  deleteCourse as deleteCourseApi,
} from "../../services.js";

export const createCourseThunk = createAsyncThunk(
  "courses/createCourse",
  async (newCourseData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No auth token found");
      }

      const response = await createCourse(newCourseData, token);

      return response.data || response;
    } catch (error) {
      console.error("Error in createCourseThunk:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCourseThunk = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, data }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authorization token found");
    }
    const response = await updateCourseApi(id, data, token);
    if (!response.successful) {
      throw new Error(response.errors || "Failed to update course");
    }
    return response.result;
  }
);

export const deleteCourseThunk = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId, { dispatch }) => {
    await deleteCourseApi(courseId);
    dispatch(deleteCourse(courseId));
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
