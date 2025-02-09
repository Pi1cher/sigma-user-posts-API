import { NextFunction, Request, Response } from "express";

import { IPost, IPostUpdateDto } from "../interfaces/post.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { postService } from "../services/post.service";

class PostController {
  public async getUserPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const result = await postService.getPosts(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const dto = req.body as IPost;

      const result = await postService.create(dto, tokenPayload);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.postId;
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;

      await postService.deletePost(postId, tokenPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.postId;
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const dto = req.body as IPostUpdateDto;

      const result = await postService.updatePost(postId, tokenPayload, dto);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const postController = new PostController();
