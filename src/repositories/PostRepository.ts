import {PostData, ReceivedPostData} from "../types/PostData";

class PostRepository {
  static async refreshPosts(type: string) {
    const tempResponse = await fetch(`/api/post/refresh/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    return await tempResponse.json();
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
    return receivedData.map((post) => {
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
    });
  }


}

export default PostRepository