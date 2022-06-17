import React from 'react';
import {Navigation} from "../components/shared/Navigation";
import {RequireAuthorization} from "../functions/RequireAuthorization";

export const ChannelList = () => {
  return (
    <main>
      <Navigation />
      <h1>This is channel list</h1>
    </main>
  )
}