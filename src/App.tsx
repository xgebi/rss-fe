import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
    Route,
} from "react-router-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {Login} from "./pages/Login";
import {Home} from "./pages/Home";
import {RequireAuthorization} from "./functions/RequireAuthorization";
import {FeedDetail} from "./pages/FeedDetail";
import {FeedItemsList} from "./pages/FeedItemsList";
import {ArticleFeedList} from "./pages/ArticleFeedList";
import {EpisodePage} from "./pages/EpisodePage";
import {ArticlePage} from "./pages/ArticlePage";
import {Subscriptions} from "./pages/Subscriptions";
import {PodcastFeedList} from "./pages/PodcastFeedList";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuthorization><Home /></RequireAuthorization>} />
          <Route path="/feed/articles" element={<RequireAuthorization><ArticleFeedList /></RequireAuthorization>} />
          <Route path="/feed/episodes" element={<RequireAuthorization><PodcastFeedList /></RequireAuthorization>} />
          <Route path="/feed/list/:id" element={<RequireAuthorization><FeedItemsList /></RequireAuthorization>} />
          <Route path="/feed/detail/:id" element={<RequireAuthorization><FeedDetail /></RequireAuthorization>} />
          <Route path="/episode/:id" element={<RequireAuthorization><EpisodePage /></RequireAuthorization>} />
          <Route path="/article/:id" element={<RequireAuthorization><ArticlePage /></RequireAuthorization>} />
          <Route path="/subscriptions" element={<RequireAuthorization><Subscriptions /></RequireAuthorization>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
