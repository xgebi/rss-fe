import React, {useEffect, useState} from 'react';
import {Navigation} from "../components/shared/Navigation";
import {ArticleFeedList} from "../components/ArticleFeedList";
import {PodcastFeedList} from "../components/PodcastFeedList";
import PostService from "../services/PostService";
import {PostData} from "../types/PostData";
import './home.css';

export const Home = () => {
  const [articles, setArticles] = useState<PostData[]>([])
  const [episodes, setEpisodes] = useState<PostData[]>([])
  const [loading, setLoading] = useState<number>(0)

  useEffect(() => {
    setLoading(2);
    PostService.fetchPosts('article', 1, 10)
      .then((data) => {
        setArticles(data);
        setLoading(loading - 1);
      });
    PostService.fetchPosts('episode', 1, 10)
      .then((data) => {
        setEpisodes(data);
        setLoading(loading - 1);
      });
  }, []);

  return (
    <main className={'page home'}>
      <Navigation />
      <ArticleFeedList data={articles} />
      <PodcastFeedList data={episodes} />
    </main>
  )
}