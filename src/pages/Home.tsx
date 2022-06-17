import React from 'react';
import {Navigation} from "../components/shared/Navigation";
import {RequireAuthorization} from "../functions/RequireAuthorization";

export const Home = () => {
  return (
    <main>
      <Navigation />
      <h1>This is home</h1>
    </main>
  )
}