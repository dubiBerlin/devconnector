import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux"; // Provider ist der "Store" der alle states der verschiedenen Komponenten enthält
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

//import logo from './logo.svg';
import './App.css';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { logoutUser, setCurrentUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import setAuthToken from "./utils/setAuthtoken";
import jwt_decode from "jwt-decode";


// Überprüfung ob token gesetzt wurde
if (localStorage.getItem("jwtToken")) {
  console.log("jwt_token: " + localStorage.jwtToken)
  // set the token in authorization-field in header 
  setAuthToken(localStorage.jwtToken);
  // decode the token to get user data
  const decoded = jwt_decode(localStorage.getItem("jwtToken"));
  // set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  // Check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // log the user out
    store.dispatch(logoutUser());
    // TODO: Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />{/* exact hindert daran dass nicht zwei Komponenten gleichzeitig angezeigt werden */}
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
