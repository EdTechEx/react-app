import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUserData, removeUserData } from "../slices/userSlice";
import { getCurrentUser } from "../../../src/services";
import { logout } from "../../../src/services";

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
      await logout();
      localStorage.removeItem("token");
      dispatch(removeUserData());
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
