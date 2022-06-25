import React, {useEffect, useState} from 'react';
import {Navigation} from "../components/shared/Navigation";
import PostService from "../services/PostService";
import {useParams} from "react-router-dom";
import {PostData} from "../types/PostData";
import parse from "html-react-parser";
import './PostPage.css';

/**
 * Episode page renders page for a single episode
 * Note: This page will be merged with Article page when I see
 * what they have in common
 *
 * @constructor
 */
export const EpisodePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostData>({
    articleContent: {
      content: null,
      description: null,
      guid: null,
      id: "",
      itunesDuration: null,
      itunesSummary: null,
      link: null,
      mediaLink: null,
      pubDate: null,
      title: null
    }, id: "", read: false,
    feed: {
      id: "",
      title: "",
      uri: "",
      description: "",
      added: null,
      createdAt: null,
      updatedAt: null,
      feedType: "",
    }
  })

  useEffect(() => {
    if (id) {
      setLoading(true);
      // TODO consider adding posts into store
      PostService.fetchPost(id)
        .then((data) => {
          setPost(data);
          setLoading(false);
          console.log(data);
          if (!data.read) {
            PostService.markAsRead(id)
              .catch((e) => console.error)
          }
        });
    }
  }, []);

  return (
    <main>
      <Navigation/>
      {loading && <p>Please wait</p>}

      {!loading && <article>
        <h1>{post.articleContent.title}</h1>
        <p>Duration: {post.articleContent.itunesDuration}</p>
        {post.articleContent.mediaLink && <audio
          controls
          src={post.articleContent.mediaLink}>
          Your browser does not support the
          <code>audio</code> element.
        </audio>}
        {post.articleContent.itunesSummary && post.articleContent.itunesSummary?.length > 0 && <p>{parse(post.articleContent.itunesSummary)}</p>}
      </article>}
    </main>
  )
}