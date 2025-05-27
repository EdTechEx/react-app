import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  token: localStorage.getItem("token"),
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
      state.token = payload.token;
      state.role =
        payload.role ||
        (payload.email === "admin@email.com" ? "admin" : "user");
      state.isAuth = true;

      if (payload.token) {
        localStorage.setItem("token", payload.token);
      }
    },
    removeUserData: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
