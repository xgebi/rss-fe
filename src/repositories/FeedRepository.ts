import FeedType from "../types/FeedType";

class FeedRepository {
  static async getFeeds() {
    const tempResponse = await fetch(`/api/feed.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    const response = await tempResponse.json();
    return response;
  }

  static async getFeed(id: string) {
    const tempResponse = await fetch(`/api/feed/${id}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    const response = await tempResponse.json();
    return response;
  }

  static async createFeed(feed: FeedType) {
    const tempResponse = await fetch(`/api/feed.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(feed),
    });
    const response = await tempResponse.json();
    return response;
  }

  static async updateFeed(feed: FeedType) {
    const tempResponse = await fetch(`/api/feed/${feed.id}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(feed),
    });
    const response = await tempResponse.json();
    return response;
  }

  static async deleteFeed(id: string) {
    const tempResponse = await fetch(`/api/feed/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    const response = await tempResponse.json();
    return response;
  }
}

export default FeedRepository;