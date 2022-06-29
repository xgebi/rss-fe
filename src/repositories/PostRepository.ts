import {ReceivedPostData} from "../types/PostData";

/**
 * Repository class which handles calls to the API for posts
 */
class PostRepository {
  /**
   *
   * @param {string} type
   * @returns Promise<ReceivedPostData[]>
   */
  static async refreshPosts(type: string): Promise<ReceivedPostData[]> {
    const tempResponse = await fetch(`/api/post/refresh/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    return await tempResponse.json();

  }

  /**
   * Fetches paginated posts
   * @param {string} type
   * @param {number} page
   * @param {number} size
   * @returns Promise<ReceivedPostData[]>
   */
  static async fetchPosts(type: string, page: number, size: number): Promise<ReceivedPostData[]> {
    const tempResponse = await fetch(`/api/post.json?type=${type}&page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    return await tempResponse.json();
  }

  /**
   *
   * @param id
   * @param values
   * @returns Promise<boolean>
   */
  static async updatePost(id: string, values: Object): Promise<boolean> {
    const tempResponse = await fetch(`/api/post/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(values)
    });
    return await tempResponse.json();
  }

  /**
   *
   * @param {string} id
   * @returns Promise<ReceivedPostData[]>
   */
  static async fetchPost(id: string): Promise<ReceivedPostData> {
    const tempResponse = await fetch(`/api/post/${id}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    return await tempResponse.json();
  }

}

export default PostRepository