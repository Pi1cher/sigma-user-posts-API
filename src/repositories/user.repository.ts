import { FilterQuery } from "mongoose";

import { OrderEnum } from "../enums/order.enum";
import { UserListOrderEnum } from "../enums/user-list-order";
import {
  IUser,
  IUserCreateDto,
  IUserListQuery,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(
    query: IUserListQuery,
  ): Promise<{ entities: IUser[]; total: number }> {
    const filterObj: FilterQuery<IUser> = { isDeleted: false };
    if (query.search) {
      filterObj.email = { $regex: query.search, $options: "i" };
    }
    const skip = query.limit * (query.page - 1);

    const sortObj: Record<string, 1 | -1> = {};
    const validSortFields = Object.values(UserListOrderEnum);

    if (validSortFields.includes(query.orderBy)) {
      sortObj[query.orderBy] = query.order === OrderEnum.ASC ? 1 : -1; // 1 for ASC, -1 for DESC
    }

    const [entities, total] = await Promise.all([
      User.find(filterObj).limit(query.limit).skip(skip).sort(sortObj),
      User.countDocuments(filterObj),
    ]);
    return { entities, total };
  }

  public async create(dto: IUserCreateDto): Promise<IUser> {
    return await User.create(dto);
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email });
  }

  public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async deleteById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
