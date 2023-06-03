import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

enum authFetchStatus {
  LOADING = "loading",
  SUCCESS = "success",
  FAILURE = "failure",
}

// interface authSliceState {
//   user:
// }

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
interface ILoginInfo {
  username: string;
  password: string;
}
interface ReturnedValues {
  token: string;
  user: any;
}

export const registerUser = createAsyncThunk<ReturnedValues, ILoginInfo>(
  "auth/registerUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/register", {
        username,
        password,
      });

      console.log(data);

      return data;
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk<ReturnedValues, ILoginInfo>(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        username,
        password,
      });

      console.log(data);

      return data;
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
  },
});

export const authReducer = authSlice.reducer;
