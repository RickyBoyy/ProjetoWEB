import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import bcrypt from "bcrypt"; // You may want to consider using bcryptjs for client-side hashing for security reasons.

// Importing components
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import News from "./components/News";

// Rendering the root component
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Import reportWebVitals and use it if necessary

// App component
function App() {
  const [users, setUsers] = useState([]);

  // Function to register users
  const handleRegister = async (name, email, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: hashedPassword,
      };
      setUsers([...users, newUser]);
      // Redirect to the login page after registration
      return <Redirect to="/Login" />;
    } catch (error) {
      console.error(error);
      // Error handling logic, if needed
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Register">
          <Register handleRegister={handleRegister} />
        </Route>
        <Route path="/Profile" component={Profile} />
        <Route path="/Games" component={Games} />
        <Route path="/Communities" component={Communities} />
        <Route path="/CreatePost" component={CreatePost} />
        <Route path="/CreateEvent" component={CreateEvent} />

        {/* Default route, redirects to the login page */}
        <Route path="/">
          <Redirect to="/Home" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
