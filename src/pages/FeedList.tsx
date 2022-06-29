import React, {useEffect, useState} from 'react';
import {Navigation} from "../components/shared/Navigation";
import {Link, useParams} from "react-router-dom";
import PostService from "../services/PostService";
import {PostData} from "../types/PostData";
import PostTypes from "../types/PostTypes";
import './FeedList.css'
import {PodcastFeedList} from "../components/PodcastFeedList";
import {ArticleFeedList} from "../components/ArticleFeedList";

export const FeedList = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [nextPage, setNextPage] = useState<number>(1);
  const [lastBatchLength, setLastBatchLength] = useState<number>(0)
  const { type } = useParams();

  useEffect(() => {
    setLoading(true);
    if (type) {
      PostService.fetchPosts(type, 1)
        .then((data) => {
          setStates(data);
        });
    }
  }, [type]);

  function refreshPosts() {
    setLoading(true);
    if (type) {
      PostService.refreshPosts(type)
        .then((data) => {
          setStates(data);
        });
    }
  }

  function loadMorePosts() {
    setLoading(true);
    if (type) {
      PostService.fetchPosts(type, nextPage)
        .then((data) => {
          setStates(data);
        });
    }
  }

  function setStates(data: PostData[]) {
    setPosts(posts.concat(data));
    setNextPage(nextPage + 1);
    setLastBatchLength(data.length);
    setLoading(false);
  }

  return (
    <main>
      <Navigation />
      <h1>This is {type}s list</h1>
      {!loading && <button onClick={refreshPosts}>Refresh articles</button>}
      {loading && <button onClick={refreshPosts} disabled>Refresh articles</button>}

      {loading && <p>Please wait</p>}
      {!loading && type === PostTypes.EPISODE && <PodcastFeedList data={posts} /> }
      {!loading && type === PostTypes.ARTICLE && <ArticleFeedList data={posts} /> }
      {lastBatchLength === 30 && <button onClick={loadMorePosts}>Load more</button>}
    </main>
  )
}