import PostRepository from "../repositories/PostRepository";
import {PostData, ReceivedPostData} from "../types/PostData";

/**
 * Layer between components and repositories which transforms data
 */
class PostService {
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
        mediaType: post.article_content.media_type,
        pubDate: post.article_content.pub_date,
        title: post.article_content.title
      },
      feed: {
        id: post.feed.id,
        title: post.feed.title,
        uri: post.feed.uri,
        description: post.feed.description,
        added: post.feed.added,
        createdAt: post.feed.created_at,
        updatedAt: post.feed.updated_at,
        feedType: post.feed.feed_type
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
        media_type: post.articleContent.mediaType,
        pub_date: post.articleContent.pubDate,
        title: post.articleContent.title
      },
      feed: {
        id: post.feed.id,
        title: post.feed.title,
        uri: post.feed.uri,
        description: post.feed.description,
        added: post.feed.added,
        created_at: post.feed.createdAt,
        updated_at: post.feed.updatedAt,
        feed_type: post.feed.feedType
      },
      read: post.read
    }
  }

  /**
   * Function used to check whether there are new posts
   *
   * @param {string} type
   * @returns Promise<PostData[]>
   */
  static async refreshPosts(type: string): Promise<PostData[]> {
    return (await PostRepository.refreshPosts(type)).map(this.transformFromBeToFe);
  }

  /**
   * Function to fetch all posts from API
   *
   * @param {string} type
   * @param {number} page
   * @param {number} size
   * @returns Promise<PostData[]>
   */
  static async fetchPosts(type: string, page: number = 1, size: number = 30): Promise<PostData[]> {
    return (await PostRepository.fetchPosts(type, page, size)).map(this.transformFromBeToFe);
  }

  /**
   * Function to change read indicator
   *
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  static async markAsRead(id: string): Promise<boolean> {
    return PostRepository.updatePost(id, {read: true})
  }

  /**
   * Function to fetch single post
   *
   * @param {string} id
   */
  static async fetchPost(id: string): Promise<PostData> {
    return this.transformFromBeToFe(await PostRepository.fetchPost(id));
  }
}

export default PostService