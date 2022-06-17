import React from 'react';
import {Navigation} from "../components/shared/Navigation";
import {RequireAuthorization} from "../functions/RequireAuthorization";

export const ChannelDetail = () => {
  return (
    <main>
      <Navigation />
      <h1>This is channel detail page</h1>
    </main>
  );
}