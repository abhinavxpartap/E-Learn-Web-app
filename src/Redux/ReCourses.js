import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchCourses = createAsyncThunk("courses/FetchCourses", async (search) => {
  try {
    const response = await axios.get(`http://localhost:3000/Course?q=${search}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});



const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    status: "idle", 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
        state.error = null;
      })
      .addCase(FetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.courses = [];
        state.error = action.error.message;
      });
  },
});

export default coursesSlice.reducer;
