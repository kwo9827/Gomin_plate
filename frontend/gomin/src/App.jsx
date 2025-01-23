import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Intro from './pages/Intro';
import MyAnswerList from './pages/MyAnswerList';
import SushiDetail from './pages/SushiDetail';
import MySushiList from './pages/MySushiList';
import SushiView from './pages/SushiView';
import PostSushi from './pages/PostSushi';
import Navbar from './components/NavBar';
import ErrorPage from './pages/ErrorPage'; // Error 페이지 임포트

function App() {
  const location = useLocation();

  // Intro 페이지가 아니면 Navbar를 보여줌
  const shouldShowNavbar = location.pathname !== '/';

  return (
    <div>
      {shouldShowNavbar && <Navbar />} {/* Intro 페이지 제외하고 Navbar 보이기 */}
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mysushilist" element={<MySushiList />} />
        <Route path="/myanswerlist" element={<MyAnswerList />} />
        <Route path="/sushidetail" element={<SushiDetail />} />
        <Route path="/sushiview" element={<SushiView />} />
        <Route path="/postsushi" element={<PostSushi />} />
        <Route path="/sushidetail" element={<SushiDetail />} />
        <Route path="*" element={<ErrorPage />} /> {/* 모든 경로에 매칭되지 않으면 ErrorPage로 이동 */}
      </Routes>
    </div>
  );
}

export default App;
