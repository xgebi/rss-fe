import React from 'react';
import {RequireAuthorization} from "../functions/RequireAuthorization";
import {Navigation} from "../components/shared/Navigation";

export const EpisodePage = () => {
  return (
    <main>
      <Navigation />
      <h1>This is episode page</h1>
    </main>
  )
}