import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import './FeedList.css'
import {FeedListPropsType} from "../types/FeedListPropsType";

export const ArticleFeedList = (props: FeedListPropsType) => {
  function displayPosts() {
    const result = []
    for (const row of props.data) {
      result.push(<tr key={row.id} className={`${!row.read ? "unread" : ""}`}>
        <td>{ row.articleContent.title }</td>
        <td>{ row.feed.title }</td>
        <td><Link to={`/article/${row.id}`} replace={true} aria-label={`Go to ${row.articleContent.title}`}>Read</Link></td>
      </tr>)
    }
    return result;
  }

  return (
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Blog</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      {displayPosts()}
      </tbody>
    </table>
  )
}