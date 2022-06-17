class FeedRepository {
  static async getFeeds() {
    const tempResponse = await fetch(`/api/feeds.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    const response = await tempResponse.json();
    sessionStorage.removeItem('token');
    return response;
  }
}

export default FeedRepository;