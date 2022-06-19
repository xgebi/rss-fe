import PostRepository from "../repositories/PostRepository";
import {PostData} from "../types/PostData";

class PostService {
  static async refreshPosts(type: string) {
    return PostRepository.refreshPosts(type)
  }

  static async fetchPosts(type: string): Promise<PostData[]> {
    return PostRepository.fetchPosts(type)
  }

  static async markAsRead(id: string): Promise<boolean> {
    return PostRepository.updatePost(id, {read: true})
  }

  static async fetchPost(id: string): Promise<PostData> {
    return PostRepository.fetchPost(id)
  }
}

export default PostService