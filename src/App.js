import React, { Component } from 'react';
import Balances from './features/balances';
import Ticker from './features/ticker';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Ticker />
        <Balances />
      </div>
    );
  }
}

export default App;
