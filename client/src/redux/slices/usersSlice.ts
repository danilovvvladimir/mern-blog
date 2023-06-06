import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authFetchStatus } from "../../types/authTypes";
import { IPost } from "../../types/postsTypes";
import axios from "../../utils/axios";

interface IUsersSliceState {
  username: string;
  userID: string;
  registerAt: string;
  // posts: IPost[];
  postsIDs: string[];
  status: authFetchStatus;
}

const initialState: IUsersSliceState = {
  username: "",
  userID: "",
  registerAt: "",
  // posts: [],
  postsIDs: [],
  status: authFetchStatus.LOADING,
};

interface ReturnedValues {
  _id: string;
  username: string;
  posts: string[];
  createdAt: string;
}

type userID = string;

export const getUser = createAsyncThunk<ReturnedValues, userID>("users/getUser", async (userID) => {
  const { data } = await axios.get(`/users/${userID}`);

  return data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get User
    builder.addCase(getUser.pending, (state) => {
      state = initialState;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.status = authFetchStatus.SUCCESS;
      state.postsIDs = action.payload.posts;
      state.registerAt = action.payload.createdAt;
      state.username = action.payload.username;
    });

    builder.addCase(getUser.rejected, (state) => {
      state.status = authFetchStatus.FAILURE;
    });
  },
});

export const usersReducer = usersSlice.reducer;
