import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { authFetchStatus, ILoginField, ReturnedValues } from "../../types/authTypes";
import axios from "../../utils/axios";
import { RootState } from "../store";

interface IAuthSliceState {
  user: any;
  token: string | null;
  status: authFetchStatus;
}

const initialState: IAuthSliceState = {
  user: null,
  token: null,
  status: authFetchStatus.LOADING,
};

export const registerUser = createAsyncThunk<ReturnedValues, ILoginField>(
  "auth/registerUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/register", {
        username,
        password,
      });

      return data;
    } catch (error) {
      const err = error as Error;

      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk<ReturnedValues, ILoginField>(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        username,
        password,
      });

      return data;
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message);
    }
  }
);

export const getMe = createAsyncThunk("posts/getMe", async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/auth/me");
    console.log("getMe data: ", data);

    return data;
  } catch (error) {
    const err = error as Error;
    console.log(err);
    return rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = authFetchStatus.LOADING;
      state.token = null;
      state.user = null;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.status = authFetchStatus.SUCCESS;
    });

    builder.addCase(registerUser.rejected, (state) => {
      state.status = authFetchStatus.FAILURE;
      state.token = null;
      state.user = null;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.status = authFetchStatus.LOADING;
      state.token = null;
      state.user = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.status = authFetchStatus.SUCCESS;
    });

    builder.addCase(loginUser.rejected, (state) => {
      state.status = authFetchStatus.FAILURE;
      state.token = null;
      state.user = null;
    });
    builder.addCase(getMe.pending, (state) => {
      state.status = authFetchStatus.LOADING;
      state.token = null;
      state.user = null;
    });

    builder.addCase(getMe.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.status = authFetchStatus.SUCCESS;
    });

    builder.addCase(getMe.rejected, (state) => {
      state.status = authFetchStatus.FAILURE;
      state.token = null;
      state.user = null;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
export const checkIsAuth = (state: RootState) => Boolean(state.auth.token);
