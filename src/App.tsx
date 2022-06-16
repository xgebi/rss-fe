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

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequireAuthorization><Home /></RequireAuthorization>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
