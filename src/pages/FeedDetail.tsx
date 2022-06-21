import React, {ChangeEventHandler, useEffect, useState} from 'react';
import {Navigation} from "../components/shared/Navigation";
import {FeedType} from "../types/FeedType";
import FeedService from "../services/FeedService";
import {useNavigate, useParams, useRoutes} from "react-router-dom";
import {navigate} from "@storybook/addon-links";
import {useUriValid} from "../functions/useUriValid";
import {Input} from "../components/shared/Input";
import PostTypes from "../types/PostTypes";

/**
 * Displays details for a feed
 *
 * @constructor
 */
export const FeedDetail = () => {
  const { id } = useParams();
  const [editingMode, setEditingMode] = useState(id && id.toLowerCase() === 'new');
  const [feed, setFeed] = useState<FeedType>({
    title: '',
    description: '',
    uri: '',
    added: null,
    createdAt: null,
    id: '',
    updatedAt: null,
    feedType: ''
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

  function saveFeed() {
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

  function deleteFeed() {
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

  function setFeedType(e: any): void {
    console.log(e);
    setFeed({
      ...feed,
      feedType: e.target.value
    } as FeedType);
  }

  /**
   * This function is intended to be temporary
   */
  function displayFeedType() {
    switch (feed.feedType) {
      case PostTypes.EPISODE: return <span>Podcast</span>;
      case PostTypes.ARTICLE: return <span>Blog</span>;
      default: return '';
    }
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
        <h2>Feed type</h2>
        <p>{displayFeedType()}</p>
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
          label={"URL"}
          value={feed.uri}
          onChange={setUri}
        />
        <section>
          <h2>Feed type</h2>
          <select onChange={setFeedType} defaultValue={feed.uri}>
            <option value={PostTypes.ARTICLE}>Blog</option>
            <option value={PostTypes.EPISODE}>Podcast</option>
          </select>
        </section>
        <button onClick={saveFeed}>Save</button>
        <button onClick={toggleEditingMode}>Cancel</button>
        <hr />
        <button onClick={deleteFeed}>Delete</button>
      </main>
    );
  }
}