import { authFetchStatus } from "./authTypes";

export type IRemovePostProp = string;

export interface IRemovePostReturn {
  message: string;
}

export interface IPost {
  _id: string;
  createdAt: string;
  updatedAt: string;
  imageURL: string;
  tags: string[];
  title: string;
  text: string;
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

export interface IPostInfo {
  title: string;
  imageURL: string;
  views: number;
  tags?: string[];
  username: string;
  userID: string;
  postID: string;
  text: string;
  status: authFetchStatus;
}

export const intitialPostInfo: IPostInfo = {
  title: "",
  imageURL: "",
  views: 0,
  tags: [],
  username: "",
  userID: "",
  postID: "",
  text: "",
  status: authFetchStatus.LOADING,
};
