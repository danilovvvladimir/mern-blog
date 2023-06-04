import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authFetchStatus } from "../../types/authTypes";

import axios from "../../utils/axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

interface IPost {
  _id: string;
  createdAt: string;
  imageURL: string;
  tags: string[];
  title: string;
  text: string;
  updatedAt: string;
  userID: string;
  username: string;
  views: number;
}

interface IPostsSliceState {
  posts: {
    items: IPost[];
    status: authFetchStatus;
  };
  tags: {
    items: string[];
    status: authFetchStatus;
  };
}
const initialState: IPostsSliceState = {
  posts: {
    items: [],
    status: authFetchStatus.LOADING,
  },
  tags: {
    items: [],
    status: authFetchStatus.LOADING,
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.status = authFetchStatus.LOADING;
      state.posts.items = [];
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.status = authFetchStatus.SUCCESS;
      state.posts.items = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.status = authFetchStatus.FAILURE;
      state.posts.items = [];
    });
  },
});

export const postsReducer = postsSlice.reducer;
