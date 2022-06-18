import React, {useState} from 'react';
import {Navigation} from "../components/shared/Navigation";
import {useParams} from "react-router-dom";
import PostService from "../services/PostService";

export const FeedList = () => {
  const { type } = useParams();
  const [loading, setLoading] = useState(false);

  function refreshPosts() {
    if (type) {
      setLoading(true);
      PostService.refreshPosts(type)
        .then((data) => {
          setLoading(false);
        });
    }
  }

  return (
    <main>
      <Navigation />
      <h1>This is {type} list</h1>
      <button onClick={refreshPosts}>Refresh {type}</button>
    </main>
  )
}