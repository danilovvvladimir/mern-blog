import { authFetchStatus } from "./authTypes";

export type IRemovePostProp = string;

export interface IRemovePostReturn {
  message: string;
}

export interface IPost {
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

export interface IPostsSliceState {
  posts: {
    items: IPost[];
    status: authFetchStatus;
  };
  tags: {
    items: string[];
    status: authFetchStatus;
  };
}