import { OrderEnum } from "../enums/order.enum";
import { UserListOrderEnum } from "../enums/user-list-order";

export interface IUser {
  _id: string;
  nickname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserCreateDto = Pick<
  IUser,
  "_id" | "nickname" | "email" | "password"
>;

export type ILogin = Pick<IUser, "email" | "password">;

export type IUserUpdateDto = Pick<IUser, "nickname">;

export type IUserListQuery = {
  page: number;
  limit: number;
  search?: string;
  order: OrderEnum;
  orderBy: UserListOrderEnum;
};

export type IUserResponse = Pick<
  IUser,
  "_id" | "nickname" | "email" | "createdAt" | "updatedAt"
>;

export type IUserShortResponse = Pick<
  IUser,
  "_id" | "nickname" | "email" | "createdAt"
>;

export interface IUserListResponse extends IUserListQuery {
  data: IUserShortResponse[];
  total: number;
}
