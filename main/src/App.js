import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Tags from "./pages/Tags"

import Profile from "./components/Profile";

function App() {
  return (
    <div class="App">
      <Router>
        <Routes>
          <Route path="/" element = {}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/profile" element={<Profil />} />
          <Route path="/register" element={<SignIn />} />
          <Route path="/roteiro" element={<Roteiro />} />
         

        </Routes>
      </Router>
    </div>
  );
}

export default App;
