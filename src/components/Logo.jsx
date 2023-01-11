import React, { Component } from 'react';
import logo from '../trivia.png';
import '../Logo.css';

class Logo extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default Logo;
