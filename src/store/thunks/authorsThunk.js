import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthors, saveAuthor } from "../slices/authorsSlice";
import { getAuthors, createAuthor } from "../../services.js";

export const createAuthorThunk = createAsyncThunk(
  "authors/createAuthor",
  async (authorData, { dispatch }) => {
    const newAuthor = await createAuthor(authorData);
    dispatch(saveAuthor(newAuthor));
  }
);

export const getAuthorsThunk = createAsyncThunk(
  "authors/getAuthors",
  async (_, { dispatch }) => {
    const response = await getAuthors();
    dispatch(setAuthors(response.result));
  }
);
