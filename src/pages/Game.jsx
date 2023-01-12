import React, { Component } from 'react';
import Header from '../components/Header';
import { validationToken } from '../api/requestTrivia';

class Game extends Component {
  componentDidMount() {
    const obj = JSON.parse(localStorage.getItem('token'));
    console.log(obj);
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default Game;
