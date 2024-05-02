import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProfilePage from "./pages/Profile";
import SignInPage from "./pages/SignIn";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import CommunitiesPage from "./pages/Community";
import CreateEventPage from "./pages/CreateEvent";
import CreatePostPage from "./pages/CreatePost";
import Header from "./components/Header";
import PostPage from "./pages/Post";
import TagsPage from "./pages/Tags";
import GamePage from "./pages/Game";
import Footer from "./pages/Footer"; // Importe o componente Footer

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<SignInPage />} />
          <Route path="/community" element={<CommunitiesPage />} />
          <Route path="/create_event" element={<CreateEventPage />} />
          <Route path="/create_post" element={<CreatePostPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
      <Footer /> {/* Adicione o componente Footer fora do Router */}
    </div>
  );
}

export default App;
