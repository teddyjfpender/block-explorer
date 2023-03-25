import React from 'react';
import logo from './logo.svg';
import './App.css';
import EthereumBlocks from './EthereumBlocks';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          A very small block explorer.
        </p>
      </header>
      <EthereumBlocks />
    </div>
  );
}

export default App;
