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
