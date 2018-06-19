import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux"; // Provider ist der "Store" der alle states der verschiedenen Komponenten enthält
import store from "./store";

import logo from './logo.svg';
import './App.css';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            < Navbar />
            <Route exact path="/" component={Landing} />{/* exact hindert daran dass nicht zwei Komponenten gleichzeitig angezeigt werden */}
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </ Provider>
    );
  }
}

export default App;
