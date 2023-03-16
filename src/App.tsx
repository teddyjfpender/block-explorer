import React from 'react';
import logo from './logo.svg';
import './App.css';
import EthereumBlocks from './EthereumBlocks';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          A work in progress.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ethereum Block Explorer
        </a>
      </header>
      <EthereumBlocks />
    </div>
  );
}

export default App;
