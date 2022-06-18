import PostRepository from "../repositories/PostRepository";

class PostService {
  static async refreshPosts(type: string) {
    return PostRepository.refreshPosts(type)
  }
}

export default PostService