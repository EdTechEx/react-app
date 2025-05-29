import { createSlice } from "@reduxjs/toolkit";
import { getAuthorsThunk, createAuthorThunk } from "../thunks/authorsThunk";

const initialState = {
  authors: [],
  loading: false,
  error: null,
};

export const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    setAuthors: (state, { payload }) => {
      state.authors = payload;
    },
    saveAuthor: (state, { payload }) => {
      state.authors.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthorsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAuthorsThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.authors = payload;
      })
      .addCase(getAuthorsThunk.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(createAuthorThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAuthorThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.authors.push(payload);
      })
      .addCase(createAuthorThunk.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

// use these actions in your components / thunks
export const { setAuthors, saveAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
