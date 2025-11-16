import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersThunk } from "../services/usersService";


const campaignsSlice = createSlice({
  name: "campaigns",
  initialState: {
    campaignsList: [],
    loading: false,
    error: null,
    usersList:[]
  },
  reducers: {
    addCampaigns: (state, action) => {
      state.campaignsList.push(...action.payload); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload; 
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export const { addCampaigns } = campaignsSlice.actions;
export default campaignsSlice.reducer;
