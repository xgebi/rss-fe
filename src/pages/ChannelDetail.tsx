import React, {useEffect, useState} from 'react';
import {Navigation} from "../components/shared/Navigation";
import FeedType from "../types/FeedType";
import FeedService from "../services/FeedService";
import {useParams, useRoutes} from "react-router-dom";

export const ChannelDetail = () => {
  const [editingMode, setEditingMode] = useState(false);
  const [feed, setFeed] = useState<FeedType | null>(null);
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setFeed(await FeedService.getFeed(id));
      }
    }
    fetchData()
      .catch(console.error)
  }, []);

  function toggleEditingMode() {
    setEditingMode(!editingMode);
  }

  function saveChannel() {

  }

  function deleteChannel() {

  }

  if (!feed) {
    return (
      <main>
        <Navigation/>
        <p>Loading data</p>
      </main>
    );
  }

  if (!editingMode) {
    return (
      <main>
        <Navigation/>
        <h1>{ feed.title }</h1>
        <h2>Description</h2>
        <p>{feed.description}</p>
        <h2>URL</h2>
        <p>{feed.uri}</p>
        <button onClick={toggleEditingMode}>Edit</button>
      </main>
    );
  } else {
    return (
      <main>
        <Navigation/>
        <h1>{ feed.title }</h1>
        <h2>Description</h2>
        <p>{feed.description}</p>
        <h2>URL</h2>
        <p>{feed.uri}</p>
        <button onClick={saveChannel}>Cancel</button>
        <button onClick={toggleEditingMode}>Cancel</button>
        <hr />
        <button onClick={deleteChannel}>Delete</button>
      </main>
    );
  }
}