import React, {useEffect, useState} from 'react';

export const SubscriptionSettings = () => {
  const [loading, setLoading] = useState(true);
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    FeedService.getFeeds()
      .then((data) => {
        setFeeds(data);
        setLoading(false);
      })
  })

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
      </table>}
    </main>
  )
}