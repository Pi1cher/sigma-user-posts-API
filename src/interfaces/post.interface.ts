export interface IPost {
  _id: string;
  text: string;
  _userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IPostCreateDto = Pick<IPost, "_id" | "text" | "_userId">;

export type IPostUpdateDto = Pick<IPost, "text">;
