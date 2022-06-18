import React, {ChangeEventHandler, useEffect, useState} from 'react';
import {Navigation} from "../components/shared/Navigation";
import FeedType from "../types/FeedType";
import FeedService from "../services/FeedService";
import {useNavigate, useParams, useRoutes} from "react-router-dom";
import {navigate} from "@storybook/addon-links";

export const FeedDetail = () => {
  const [editingMode, setEditingMode] = useState(false);
  const [feed, setFeed] = useState<FeedType | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

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
    const fetchData = async () => {
      if (feed) {
        setFeed(await FeedService.updateFeed(feed));
        setEditingMode(false);
      }
    }
    fetchData()
      .catch(console.error)
  }

  function deleteChannel() {
    const fetchData = async () => {
      if (id) {
        await FeedService.deleteFeed(id)
      }
    }
    fetchData()
      .then(() => {
        navigate("/subscriptions", { replace: true })
      })
      .catch(console.error)
  }

  function setTitle(e: any): void {
    setFeed({
      ...feed,
      title: e.target.value
    } as FeedType);
  }

  function setUrl(e: any): void {
    setFeed({
      ...feed,
      uri: e.target.value
    } as FeedType);
  }

  function setDescription(e: any): void {
    setFeed({
      ...feed,
      description: e.target.value
    } as FeedType);
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
        <h1><input type={"text"} value={ feed.title } onChange={setTitle} /></h1>
        <h2>Description</h2>
        <p><textarea onChange={setDescription} value={feed.description}></textarea></p>
        <h2>URL</h2>
        <p><input type={"text"} value={feed.uri} onChange={setUrl} /></p>
        <button onClick={saveChannel}>Save</button>
        <button onClick={toggleEditingMode}>Cancel</button>
        <hr />
        <button onClick={deleteChannel}>Delete</button>
      </main>
    );
  }
}