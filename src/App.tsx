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
import {ChannelDetail} from "./pages/ChannelDetail";
import {ChannelItemsList} from "./pages/ChannelItemsList";
import {ChannelList} from "./pages/ChannelList";
import {EpisodePage} from "./pages/EpisodePage";
import {ArticlePage} from "./pages/ArticlePage";
import {SubscriptionSettings} from "./pages/SubscriptionSettings";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuthorization><Home /></RequireAuthorization>} />
          <Route path="/channel/:type" element={<RequireAuthorization><ChannelList /></RequireAuthorization>} />
          <Route path="/channel/list/:id" element={<RequireAuthorization><ChannelItemsList /></RequireAuthorization>} />
          <Route path="/channel/detail/:id" element={<RequireAuthorization><ChannelDetail /></RequireAuthorization>} />
          <Route path="/episode/:id" element={<RequireAuthorization><EpisodePage /></RequireAuthorization>} />
          <Route path="/article/:id" element={<RequireAuthorization><ArticlePage /></RequireAuthorization>} />
          <Route path="/subscriptions" element={<RequireAuthorization><SubscriptionSettings /></RequireAuthorization>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
