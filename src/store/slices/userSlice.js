import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: !!localStorage.getItem("token"),
  name: localStorage.getItem("name") || "",
  email: localStorage.getItem("email") || "",
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role") || null,
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

      localStorage.setItem("token", payload.token);
      localStorage.setItem("name", payload.name);
      localStorage.setItem("email", payload.email);
      localStorage.setItem("role", state.role);
    },
    removeUserData: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      return {
        isAuth: false,
        name: "",
        email: "",
        token: null,
        role: null,
      };
    },
  },
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
