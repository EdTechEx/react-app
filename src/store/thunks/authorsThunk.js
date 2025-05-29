import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthors, createAuthor } from "../../services.js";

export const createAuthorThunk = createAsyncThunk(
  "authors/createAuthor",
  async (authorData, { rejectWithValue }) => {
    try {
      const response = await createAuthor(authorData);

      if (response.successful) {
        return response.result;
      }

      return rejectWithValue("Failed to create author");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAuthorsThunk = createAsyncThunk(
  "authors/getAuthors",
  async () => {
    const response = await getAuthors();
    return response.result;
  }
);
