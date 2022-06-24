import React, {useEffect, useState} from 'react';
import {Navigation} from "../components/shared/Navigation";
import {Link, useParams} from "react-router-dom";
import PostService from "../services/PostService";
import {PostData} from "../types/PostData";
import PostTypes from "../types/PostTypes";
import './PodcastFeedList.css'

export const ArticleFeedList = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([])

  useEffect(() => {
    setLoading(true);
    // TODO consider adding posts into store
    PostService.fetchPosts(PostTypes.ARTICLE)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  function refreshPosts() {
    setLoading(true);
    PostService.refreshPosts(PostTypes.ARTICLE)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }

  function displayPosts() {
    const result = []
    for (const row of posts) {
      result.push(<tr>
        <td className={`${!row.read ? "unread" : ""}`}>{ row.articleContent.title }</td>
        <td>{ row.feed.title }</td>
        <td><Link to={`/article/${row.id}`} replace={true} aria-label={`Go to ${row.articleContent.title}`}>Read</Link></td>
      </tr>)
    }
    return result;
  }

  return (
    <main>
      <Navigation />
      <h1>This is articles list</h1>
      {!loading && <button onClick={refreshPosts}>Refresh articles</button>}
      {loading && <button onClick={refreshPosts} disabled>Refresh articles</button>}

      {loading && <p>Please wait</p>}
      {!loading && <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Blog</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {displayPosts()}
        </tbody>
      </table>}
    </main>
  )
}