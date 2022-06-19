import {PostData, ReceivedPostData} from "../types/PostData";
import {FeedType, ReceivedFeedType} from "../types/FeedType";

class PostRepository {
  /**
   * Method which handles translation between JSON objects, so it follows
   * JavaScript's naming conventions
   *
   * @returns {FeedType}
   * @param post
   */
  static transformFromBeToFe(post: ReceivedPostData): PostData {
    return {
      id: post.id,
      articleContent: {
        content: post.article_content.content,
        description: post.article_content.description,
        guid: post.article_content.guid,
        id: post.article_content.id,
        itunesDuration: post.article_content.itunes_duration,
        itunesSummary: post.article_content.itunes_summary,
        link: post.article_content.link,
        mediaLink: post.article_content.media_link,
        pubDate: post.article_content.pub_date,
        title: post.article_content.title
      },
      read: post.read
    }
  }

  /**
   * Method which handles translation between JSON objects, so it follows
   * Ruby's naming conventions
   *
   * @returns {ReceivedFeedType}
   * @param post
   */
  static transformFromFeToBe(post: PostData): ReceivedPostData {
    return {
      id: post.id,
      article_content: {
        content: post.articleContent.content,
        description: post.articleContent.description,
        guid: post.articleContent.guid,
        id: post.articleContent.id,
        itunes_duration: post.articleContent.itunesDuration,
        itunes_summary: post.articleContent.itunesSummary,
        link: post.articleContent.link,
        media_link: post.articleContent.mediaLink,
        pub_date: post.articleContent.pubDate,
        title: post.articleContent.title
      },
      read: post.read
    }
  }

  static async refreshPosts(type: string) {
    const tempResponse = await fetch(`/api/post/refresh/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    const receivedData: ReceivedPostData[] = await tempResponse.json();
    return receivedData.map(this.transformFromBeToFe);
  }

  static async fetchPosts(type: string): Promise<PostData[]> {
    const tempResponse = await fetch(`/api/post.json?type=${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    const receivedData: ReceivedPostData[] = await tempResponse.json();
    return receivedData.map(this.transformFromBeToFe);
  }

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

  static async fetchPost(id: string): Promise<PostData> {
    const tempResponse = await fetch(`/api/post/${id}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    return this.transformFromBeToFe(await tempResponse.json());
  }

}

export default PostRepository