import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUserData, removeUserData } from "../slices/userSlice";
import { getCurrentUser } from "../../../src/services";

export const getUserThunk = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No token found");
      }
      const userData = await getCurrentUser(token);
      dispatch(setUserData({ ...userData, token }));
      return userData;
    } catch (error) {
      dispatch(removeUserData());
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    try {
      localStorage.removeItem("token");
      dispatch(removeUserData());
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
