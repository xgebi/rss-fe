class FeedService {
  static async getFeeds() {
    return FeedRepository.getFeeds();
  }
}