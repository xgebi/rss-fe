import React, {ReactElement, useEffect, useLayoutEffect, useState} from 'react';
import FeedService from "../services/FeedService";
import {Navigation} from "../components/shared/Navigation";
import FeedType from "../types/FeedType";
import {Link} from "react-router-dom";

export const SubscriptionSettings = () => {
  const [feeds, setFeeds] = useState<FeedType[]>([]);
  console.log("3");
  useEffect(() => {
    const fetchData = async () => {
      console.log("damn", feeds);
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
        <td><Link to={`/channel/detail/${feed["id"]}`}>Edit</Link></td>
      </tr>)
    })
    return rows;
  }

  return (
      <main>
        <Navigation />
        <h1>Subscriptions</h1>
        <button>Add new</button>
        {!feeds && <p>Loading feeds</p>}

        {feeds && <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            {printFeeds()}
          </tbody>
        </table>}
      </main>)
}