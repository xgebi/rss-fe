import React, {ChangeEventHandler, useEffect, useState} from 'react';
import {Navigation} from "../components/shared/Navigation";
import FeedType from "../types/FeedType";
import FeedService from "../services/FeedService";
import {useNavigate, useParams, useRoutes} from "react-router-dom";
import {navigate} from "@storybook/addon-links";
import {useUriValid} from "../functions/useUriValid";
import {Input} from "../components/shared/Input";

export const FeedDetail = () => {
  const { id } = useParams();
  const [editingMode, setEditingMode] = useState(id && id.toLowerCase() === 'new');
  const [feed, setFeed] = useState<FeedType>({
          title: '',
          description: '',
          uri: '',
          added: null,
          created_at: null,
          id: '',
          updated_at: null

        });
  const isUriValid = useUriValid(feed.uri);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id && id.toLowerCase() !== 'new') {
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
      if (!isUriValid) {
        return;
      }
      if (feed.id.length > 0) {
        setFeed(await FeedService.updateFeed(feed));
      } else {
        setFeed(await FeedService.createFeed(feed));
      }
      setEditingMode(false);
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

  function setTitle(title: string): void {
    setFeed({
      ...feed,
      title: title
    } as FeedType);
  }

  function setUri(uri: string): void {
    setFeed({
      ...feed,
      uri: uri
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
        <Input
          label={"Title"}
          value={feed.title}
          onChange={setTitle}
        />
        <h2>Description</h2>
        <p><textarea onChange={setDescription} value={feed.description}></textarea></p>
        <Input
          label={"Title"}
          value={feed.uri}
          onChange={setUri}
        />
        <button onClick={saveChannel}>Save</button>
        <button onClick={toggleEditingMode}>Cancel</button>
        <hr />
        <button onClick={deleteChannel}>Delete</button>
      </main>
    );
  }
}