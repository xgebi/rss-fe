import React, {useEffect, useState} from 'react';
import {Navigation} from "../components/shared/Navigation";
import {PostData} from "../types/PostData";
import PostService from "../services/PostService";
import parse from "html-react-parser";
import {useParams} from "react-router-dom";

export const ArticlePage = () => {
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
    }, id: "", read: false
  })

  useEffect(() => {
    if (id) {
      setLoading(true);
      // TODO consider adding posts into store
      PostService.fetchPost(id)
        .then((data) => {
          setPost(data);
          setLoading(false);

          if (!data.read) {
            PostService.markAsRead(id)
              .catch((e) => console.error)
          }
        });
    }
  }, []);


  return (
    <main>
      <Navigation />
      {loading && <p>Please wait</p>}
      {!loading && <>
        <h1>{post.articleContent.title}</h1>
        {post.articleContent.content?.length === 0 && <p>{post.articleContent.description}</p>}
        {/* Below, wait for IDE update, red underlines don't make me happy */}
        {post.articleContent.content && post.articleContent.content?.length > 0 && <p>{parse(post.articleContent.content)}</p>}
      </>}
    </main>
  )
}