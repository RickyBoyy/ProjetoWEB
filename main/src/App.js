import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProfilePage from "./pages/Profile";
import SignInPage from "./pages/SignIn";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import CommunitiesPage from "./pages/Communities";
import CreateEventPage from "./pages/CreateEvent";
import CreatePostPage from "./pages/CreatePost";
import Header from "./components/Header";
import PostPage from "./pages/Post";
import TagsPage from "./pages/Tags";
import GamePage from "./pages/Game";
import Footer from "./components/Footer";  // Ensure this is the correct path
import CreateCommunityPage from "./pages/CreateCommunity";  // Corrected name
import MapPage from "./pages/Maps";
import ReviewsPage from "./pages/Reviews";
import GameListPage from "./pages/GameList";
import EventPage from "./pages/Event";
import CommunityPage from "./pages/Community";
import { AuthProvider } from './Contexts/AuthContext'
import ChartsPage from "./pages/Charts";
import NotFoundPage from "./pages/NotFound";  // Ensure you have a NotFound component

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:user_id" element={<ProfilePage />} />
            <Route path="/register" element={<SignInPage />} />
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/create_event" element={<CreateEventPage />} />
            <Route path="/create_post" element={<CreatePostPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/games/:id" element={<GamePage />} />
            <Route path="/events/:eventId" element={<EventPage />} />
            <Route path="/create_community" element={<CreateCommunityPage />} />
            <Route path="/maps" element={<MapPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/gamelist/:genreId" element={<GameListPage />} />
            <Route path="/community/:communityId" element={<CommunityPage />} />
            <Route path="/charts" element={<ChartsPage />} />
            <Route path="*" element={<NotFoundPage />} />  {/* Fallback route for 404 */}
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
