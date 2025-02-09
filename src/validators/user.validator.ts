import joi from "joi";

import { regexConstant } from "../constants/regex.constants";
import { OrderEnum } from "../enums/order.enum";
import { UserListOrderEnum } from "../enums/user-list-order";

export class UserValidator {
  private static nickname = joi.string().min(3).max(50).trim();
  private static email = joi.string().regex(regexConstant.EMAIL).trim();
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();

  public static create = joi.object({
    nickname: this.nickname.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  public static update = joi.object({
    nickname: this.nickname,
  });

  public static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
  public static getListQuery = joi.object({
    limit: joi.number().min(1).max(100).default(10),
    page: joi.number().min(1).default(1),
    search: joi.string().trim(),
    order: joi
      .string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.ASC),
    orderBy: joi
      .string()
      .valid(...Object.values(UserListOrderEnum))
      .default(UserListOrderEnum.CREATED_AT),
  });
}
