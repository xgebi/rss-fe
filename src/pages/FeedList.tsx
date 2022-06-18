import React from 'react';
import {Navigation} from "../components/shared/Navigation";
import {useParams} from "react-router-dom";

export const FeedList = () => {
  const { type } = useParams();

  return (
    <main>
      <Navigation />
      <h1>This is {type} list</h1>
    </main>
  )
}