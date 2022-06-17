import React from 'react';
import {Navigation} from "../components/shared/Navigation";
import {RequireAuthorization} from "../functions/RequireAuthorization";

export const ArticlePage = () => {
  return (
    <main>
      <Navigation />
      <h1>This is articles page</h1>
    </main>
  )
}