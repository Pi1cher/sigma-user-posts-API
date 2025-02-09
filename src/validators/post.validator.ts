import joi from "joi";

export class PostValidator {
  private static text = joi.string().trim();

  public static create = joi.object({
    text: this.text.required(),
  });

  public static update = joi.object({
    text: this.text,
  });
}
