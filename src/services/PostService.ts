import PostRepository from "../repositories/PostRepository";
import {PostData} from "../types/PostData";

class PostService {
  static async refreshPosts(type: string) {
    return PostRepository.refreshPosts(type)
  }

  static async fetchPosts(type: string): Promise<PostData[]> {
    return PostRepository.fetchPosts(type)
  }
}

export default PostService