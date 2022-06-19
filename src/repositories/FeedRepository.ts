import {FeedType, ReceivedFeedType} from "../types/FeedType";

/**
 * Class which serves as a layer between business logic of feeds and API
 */
class FeedRepository {
  /**
   * Method which handles translation between JSON objects, so it follows
   * JavaScript's naming conventions
   *
   * @param {ReceivedFeedType} feed
   * @returns {FeedType}
   */
  static transformFromBeToFe(feed: ReceivedFeedType): FeedType {
    return {
      id: feed.id,
      title: feed.title,
      uri: feed.uri,
      description: feed.description,
      added: feed.added,
      createdAt: feed.created_at,
      updatedAt: feed.updated_at,
      feedType: feed.feed_type
    }
  }

  /**
   * Method which handles translation between JSON objects, so it follows
   * Ruby's naming conventions
   *
   * @param {FeedType} feed
   * @returns {ReceivedFeedType}
   */
  static transformFromFeToBe(feed: FeedType): ReceivedFeedType {
    return {
      id: feed.id,
      title: feed.title,
      uri: feed.uri,
      description: feed.description,
      added: feed.added,
      created_at: feed.createdAt,
      updated_at: feed.updatedAt,
      feed_type: feed.feedType
    }
  }

  /**
   * Method that gets all feeds for a user from API
   *
   * @returns {Promise<FeedType[]>}
   */
  static async getFeeds(): Promise<FeedType[]> {
    const tempResponse = await fetch(`/api/feed.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    const response: ReceivedFeedType[] = await tempResponse.json();
    return response.map(this.transformFromBeToFe);
  }

  /**
   * Method which gets a selected feed
   *
   * @param {string} id
   * @returns {Promise<FeedType>}
   */
  static async getFeed(id: string): Promise<FeedType> {
    const tempResponse = await fetch(`/api/feed/${id}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    return this.transformFromBeToFe(await tempResponse.json());
  }

  /**
   *  Method which calls back-end with data for new feed
   *
   * @param {FeedType} feed
   * @returns {Promise<FeedType>}
   */
  static async createFeed(feed: FeedType): Promise<FeedType> {
    const tempResponse = await fetch(`/api/feed.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(this.transformFromFeToBe(feed)),
    });
    return this.transformFromBeToFe(await tempResponse.json());
  }

  /**
   * Method which calls back-end with data to update a feed
   *
   * @param {FeedType} feed
   * @returns {Promise<FeedType>}
   */
  static async updateFeed(feed: FeedType): Promise<FeedType> {
    const tempResponse = await fetch(`/api/feed/${feed.id}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(this.transformFromFeToBe(feed)),
    });
    return this.transformFromBeToFe(await tempResponse.json());
  }

  /**
   * Function which deletes a feed
   *
   * @param id
   */
  static async deleteFeed(id: string) {
    const tempResponse = await fetch(`/api/feed/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    return await tempResponse.json();
  }
}

export default FeedRepository;