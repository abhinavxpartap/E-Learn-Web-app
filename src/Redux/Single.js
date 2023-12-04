import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchCoursedetail = createAsyncThunk("coursedetail/FetchCoursedetail", async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/Course/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const SingleSlice = createSlice({
  name: "coursedetail",
  initialState: {
    courses: [],
    status: "idle", 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchCoursedetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchCoursedetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
        state.error = null;
      })
      .addCase(FetchCoursedetail.rejected, (state, action) => {
        state.status = "failed";
        state.courses = [];
        state.error = action.error.message;
      });
  },
});

export default SingleSlice.reducer;
