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
import {FeedList} from "./pages/FeedList";
import {PostPage} from "./pages/PostPage";
import {Subscriptions} from "./pages/Subscriptions";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuthorization><Home /></RequireAuthorization>} />
          <Route path="/feed/:type" element={<RequireAuthorization><FeedList /></RequireAuthorization>} />
          <Route path="/feed/list/:id" element={<RequireAuthorization><FeedItemsList /></RequireAuthorization>} />
          <Route path="/feed/detail/:id" element={<RequireAuthorization><FeedDetail /></RequireAuthorization>} />
          <Route path="/:type/:id" element={<RequireAuthorization><PostPage /></RequireAuthorization>} />
          <Route path="/subscriptions" element={<RequireAuthorization><Subscriptions /></RequireAuthorization>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
