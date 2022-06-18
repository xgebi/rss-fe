class PostRepository {
  static async refreshPosts(type: string) {
    const tempResponse = await fetch(`/api/post/refresh`, {
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