import React from 'react';
import {Link} from "react-router-dom";
import './PodcastFeedList.css';
import {FeedListPropsType} from "../types/FeedListPropsType";

export const PodcastFeedList = (props: FeedListPropsType) => {
  function displayPosts() {
    const result = []
    for (const row of props.data) {
      result.push(<tr key={row.id}>
        <td className={`${!row.read ? "unread" : ""}`}>{ row.articleContent.title }</td>
        <td>{ row.articleContent.itunesDuration }</td>
        <td>{ row.feed.title }</td>
        <td><Link to={`/episode/${row.id}`} replace={true} aria-label={`Go to ${row.articleContent.title}`}>Read</Link></td>
      </tr>)
    }
    return result;
  }

  return (
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Duration</th>
        <th>Podcast</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      {displayPosts()}
      </tbody>
    </table>
  )
}