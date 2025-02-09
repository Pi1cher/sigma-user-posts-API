import {
  IUser,
  IUserListQuery,
  IUserListResponse,
  IUserResponse,
  IUserShortResponse,
} from "../interfaces/user.interface";

class UserPresenter {
  public toResponse(entity: IUser): IUserResponse {
    return {
      _id: entity._id,
      nickname: entity.nickname,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public toShortResponse(entity: IUser): IUserShortResponse {
    return {
      _id: entity._id,
      nickname: entity.nickname,
      email: entity.email,
      createdAt: entity.createdAt,
    };
  }

  public toResponseList(
    entities: IUser[],
    total: number,
    query: IUserListQuery,
  ): IUserListResponse {
    return {
      data: entities.map(this.toShortResponse),
      total,
      ...query,
    };
  }
}

export const userPresenter = new UserPresenter();
