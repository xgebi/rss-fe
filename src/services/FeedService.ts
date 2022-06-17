import FeedRepository from "../repositories/FeedRepository";
import FeedType from "../types/FeedType";

class FeedService {
  static async getFeeds() {
    return FeedRepository.getFeeds();
  }

  static async getFeed(id: string) {
    return FeedRepository.getFeed(id);
  }

  static async createFeed(feed: FeedType) {
    return FeedRepository.createFeed(feed);
  }

  static async updateFeed(feed: FeedType) {
    return FeedRepository.updateFeed(feed);
  }

  static async deleteFeed(id: string) {
    return FeedRepository.deleteFeed(id);
  }
}

export default FeedService;