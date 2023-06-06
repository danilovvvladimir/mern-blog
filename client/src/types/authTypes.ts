export interface ILoginField {
  username: string;
  password: string;
}

export enum authFetchStatus {
  LOADING = "loading",
  SUCCESS = "success",
  FAILURE = "failure",
}

export interface ReturnedValues {
  token: string;
  user: any;
}
// {
//     _id: "",
//     createdAt: "",
//     posts: [],
//     updatedAt: "",
//     username:
//   }

interface IUser {
  createdAt: string;
  updatedAt: string;
  username: string;
  _id: string;
  posts: string[];
}

export interface IAuthSliceState {
  user: IUser | null;
  token: string | null;
  status: authFetchStatus;
}
