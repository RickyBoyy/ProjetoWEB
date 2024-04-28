import logo from "./images/LogoOnlySymbol.png";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProfilePage from "./pages/Profile";
import SignInPage from "./pages/SignIn";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import CommunitiesPage from "./pages/Community";
import CreateEventPage from "./pages/CreateEvent";
import CreatePostPage from "./pages/CreatePost";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<SignInPage />} />
          <Route path="/community" element={<CommunitiesPage />} />
          <Route path="/create_event" element={<CreateEventPage />} />
          <Route path="/create_post" element={<CreatePostPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
