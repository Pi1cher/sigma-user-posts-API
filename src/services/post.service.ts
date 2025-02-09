import { ApiError } from "../errors/api-error";
import { IPost, IPostUpdateDto } from "../interfaces/post.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { postRepository } from "../repositories/post.repository";

class PostService {
  public async getPosts(userId: string): Promise<IPost[]> {
    return await postRepository.getPosts(userId);
  }

  public async create(dto: any, tokenPayload: ITokenPayload): Promise<IPost> {
    return await postRepository.create({
      ...dto,
      _userId: tokenPayload.userId,
    });
  }

  public async deletePost(
    postId: string,
    tokenPayload: ITokenPayload,
  ): Promise<void> {
    const post = await postRepository.getById(postId);

    if (post._userId.toString() !== tokenPayload.userId) {
      throw new ApiError("Post not found", 404);
    }

    return await postRepository.deletePost(postId);
  }

  public async updatePost(
    postId: string,
    tokenPayload: ITokenPayload,
    dto: IPostUpdateDto,
  ): Promise<IPost> {
    const post = await postRepository.getById(postId);
    if (!post) {
      throw new ApiError("Post not found", 404);
    }
    if (post._userId.toString() !== tokenPayload.userId) {
      throw new ApiError("Post not found", 404);
    }
    return await postRepository.updatePost(post._id, dto);
  }
}

export const postService = new PostService();
