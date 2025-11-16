import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsersThunk = createAsyncThunk(
  "campaigns/fetch",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("API error");
    return await res.json();
  }
);
