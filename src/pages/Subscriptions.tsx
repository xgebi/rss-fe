import React, {ReactElement, useEffect, useState} from 'react';
import FeedService from "../services/FeedService";
import {Navigation} from "../components/shared/Navigation";
import {FeedType} from "../types/FeedType";
import {Link} from "react-router-dom";

/**
 * Page that displays all subscribed feeds
 *
 * @constructor
 */
export const Subscriptions = () => {
  const [feeds, setFeeds] = useState<FeedType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setFeeds(await FeedService.getFeeds());
    }
    fetchData()
      .catch(console.error)
  }, []);

  function printFeeds() {
    const rows: ReactElement[] = [];
    if (feeds.length === 0) {
      rows.push(<tr key={0}>
        <td colSpan={2}>No items</td>
      </tr>)
      return rows;
    }
    feeds.forEach((feed, index) => {
      rows.push(<tr key={index}>
        <td>{feed["title"]}</td>
        <th>{feed.feedType}</th>
        <td><Link to={`/feed/detail/${feed["id"]}`}>Edit</Link></td>
      </tr>)
    })
    return rows;
  }

  return (
      <main>
        <Navigation />
        <h1>Subscriptions</h1>
        <Link to={`/feed/detail/new`}>Add new</Link>
        {!feeds && <p>Loading feeds</p>}

        {feeds && <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            {printFeeds()}
          </tbody>
        </table>}
      </main>)
}