import React, {useEffect, useState} from 'react';
import {Navigation} from "../components/shared/Navigation";
import {Link, useParams} from "react-router-dom";
import PostService from "../services/PostService";
import {PostData} from "../types/PostData";
import PostTypes from "../types/PostTypes";

export const PodcastFeedList = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([])

  useEffect(() => {
    setLoading(true);
    // TODO consider adding posts into store
    PostService.fetchPosts(PostTypes.EPISODE)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  function refreshPosts() {
    setLoading(true);
    PostService.refreshPosts(PostTypes.EPISODE)
      .then((data) => {
        setPosts(data)
        setLoading(false);
      });
  }

  function displayPosts() {
    const result = []
    for (const row of posts) {
      result.push(<tr key={row.id}>
        <td className={`${row.read ? "unread" : ""}`}>{ row.articleContent.title }</td>
        <td>{ row.articleContent.itunesDuration }</td>
        <td><Link to={`/episode/${row.id}`} replace={true} aria-label={`Go to ${row.articleContent.title}`}>Read</Link></td>
      </tr>)
    }
    return result;
  }

  return (
    <main>
      <Navigation />
      <h1>This is episodes list</h1>
      {!loading && <button onClick={refreshPosts}>Refresh episodes</button>}
      {loading && <button onClick={refreshPosts} disabled>Refresh episodes</button>}

      {loading && <p>Please wait</p>}
      {!loading && <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
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