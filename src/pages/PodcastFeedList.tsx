import React, {useEffect, useState} from 'react';
import {Navigation} from "../components/shared/Navigation";
import {Link, useParams} from "react-router-dom";
import PostService from "../services/PostService";
import {PostData} from "../types/PostData";
import PostTypes from "../types/PostTypes";

export const ArticleFeedList = () => {
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([])

  useEffect(() => {
    if (type) {
      setLoading(true);
      // TODO consider adding posts into store
      PostService.fetchPosts(PostTypes.EPISODE)
        .then((data) => {
          setPosts(data);
          setLoading(false);
        });
    }
  }, []);

  function refreshPosts() {
    if (type) {
      setLoading(true);
      PostService.refreshPosts(PostTypes.EPISODE)
        .then((data) => {
          setLoading(false);
        });
    }
  }

  function displayPosts() {
    const result = []
    for (const row of posts) {
      result.push(<tr key={row.id}>
        <td className={`${row.read ? "unread" : ""}`}>{ row.articleContent.title }</td>
        <td><Link to={`/episode/${row.id}`} replace={true} aria-label={`Go to ${row.articleContent.title}`}>Read</Link></td>
      </tr>)
    }
    return result;
  }

  return (
    <main>
      <Navigation />
      <h1>This is {type} list</h1>
      {!loading && <button onClick={refreshPosts}>Refresh {type}</button>}
      {loading && <button onClick={refreshPosts} disabled>Refresh {type}</button>}

      {loading && <p>Please wait</p>}
      {!loading && <table>
        <thead>
          <tr>
            <th>Title</th>
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