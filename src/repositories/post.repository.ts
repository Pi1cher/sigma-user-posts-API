import { IPost, IPostCreateDto } from "../interfaces/post.interface";
import { Post } from "../models/post.model";

class PostRepository {
  public async getPosts(userId: string): Promise<IPost[]> {
    return await Post.find({ _userId: userId });
  }

  public async getById(postId: string): Promise<IPost> {
    return await Post.findById(postId);
  }

  public async create(dto: IPostCreateDto): Promise<IPost> {
    return await Post.create(dto);
  }

  public async deletePost(_id: string): Promise<void> {
    await Post.deleteOne({ _id });
  }

  public async updatePost(postId: string, dto: Partial<IPost>): Promise<IPost> {
    return await Post.findByIdAndUpdate(postId, dto, { new: true });
  }
}

export const postRepository = new PostRepository();
