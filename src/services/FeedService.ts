import FeedRepository from "../repositories/FeedRepository";

class FeedService {
  static async getFeeds() {
    return FeedRepository.getFeeds();
  }
}

export default FeedService;