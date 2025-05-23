import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  token: localStorage.getItem("token"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      return {
        ...payload,
        isAuth: true,
      };
    },
    removeUserData: (state, { payload }) => {
      return initialState;
    },
  },
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
