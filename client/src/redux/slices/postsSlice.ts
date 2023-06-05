import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authFetchStatus } from "../../types/authTypes";
import { IPostsSliceState, IRemovePostProp, IRemovePostReturn } from "../../types/postsTypes";

import axios from "../../utils/axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchLatestTags = createAsyncThunk("posts/fetchLatestTags", async () => {
  const { data } = await axios.get("/posts/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk<IRemovePostReturn, IRemovePostProp>(
  "posts/fetchRemovePost",
  async (id) => await axios.delete(`/posts/${id}`)
);

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
    // Get Posts
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

    // Get Tags
    builder.addCase(fetchLatestTags.pending, (state) => {
      state.tags.status = authFetchStatus.LOADING;
      state.tags.items = [];
    });

    builder.addCase(fetchLatestTags.fulfilled, (state, action) => {
      state.tags.status = authFetchStatus.SUCCESS;
      state.tags.items = action.payload;
    });

    builder.addCase(fetchLatestTags.rejected, (state) => {
      state.tags.status = authFetchStatus.FAILURE;
      state.tags.items = [];
    });

    // Remove post
    builder.addCase(fetchRemovePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg);
    });
  },
});

export const postsReducer = postsSlice.reducer;
