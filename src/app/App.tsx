import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavHeader from "./components/NavHeader";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <div className="App MainBody">
        <NavHeader></NavHeader>
        <Login></Login>
      </div>
    );
  }
}

export default App;
