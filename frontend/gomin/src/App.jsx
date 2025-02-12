import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import MyAnswerList from "./pages/MyAnswerList";
import SushiDetail from "./pages/SushiDetail";
import SushiAnswerDetail from "./pages/SushiAnswerDetail";
import MySushiList from "./pages/MySushiList";
import SushiView from "./pages/SushiView";
import PostSushi from "./pages/PostSushi";
import Navbar from "./components/NavBar";
import OAuthCallback from "./components/OAuthCallback";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Navbar 표시 여부 결정
  const shouldShowNavbar = location.pathname !== "/";

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // const accessToken = "123";

    if (!accessToken && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="container">
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mysushilist" element={<MySushiList />} />
        <Route path="/myanswerlist" element={<MyAnswerList />} />
        <Route path="/sushidetail/:sushiId" element={<SushiDetail />} />
        <Route path="/sushiview" element={<SushiView />} />
        <Route path="/postsushi" element={<PostSushi />} />
        <Route
          path="/sushianswerdetail/:sushiId"
          element={<SushiAnswerDetail />}
        />
        <Route path="/oauth/kakao/callback" element={<OAuthCallback />} />
        <Route path="/oauth/google/callback" element={<OAuthCallback />} />
        <Route path="/share/:token" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
