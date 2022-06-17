import React, {useEffect, useState} from 'react';
import FeedService from "../services/FeedService";

export const SubscriptionSettings = () => {
  const [loading, setLoading] = useState(true);
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    FeedService.getFeeds()
      .then((data) => {
        setFeeds(data);
        setLoading(false);
      });
  }, [])

  function printFeeds() {
    const rows = [];
      for (const feed of feeds) {
        rows.push(<tr>
          <td>{feed["name"]}</td>
          <td><a>Edit</a></td>
        </tr>)
      }
    return rows;
  }

  return (
    <main>
      <h1>Subscriptions</h1>
      <button>Add new</button>
      {loading && <p>Loading feeds</p>}

      {!loading && <table>
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
    </main>
  )
}