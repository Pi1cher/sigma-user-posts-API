import { Router } from "express";

import { postController } from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { PostValidator } from "../validators/post.validator";

const router = Router();

router.get("/:userId", postController.getUserPosts);

router.post(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.validateBody(PostValidator.create),
  postController.create,
);

router.delete(
  "/me/:postId",
  authMiddleware.checkAccessToken,
  postController.deletePost,
);

router.put(
  "/me/:postId",
  authMiddleware.checkAccessToken,
  commonMiddleware.validateBody(PostValidator.update),
  postController.updatePost,
);

export const postRouter = router;
