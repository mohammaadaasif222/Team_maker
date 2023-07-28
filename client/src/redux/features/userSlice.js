import { createSlice } from "@reduxjs/toolkit";
import {fetchSingleUser,deleteUser,updateUser} from '../actions/userActions'

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    message:''
  },
  reducers: {
    clearMessage: (state) => {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; 
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { clearMessage } = userSlice.actions;
export default userSlice.reducer;
