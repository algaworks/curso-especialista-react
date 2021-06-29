import logo from './logo.svg';
import './App.css';
import React from 'react';

const Component = React
  .createElement('div', { style: { background: 'red' } }, 'Olá, Mundo')

const HTMLElement = document.createElement('div')
HTMLElement.style.background = 'red'
HTMLElement.innerText = 'Olá, mundo!'

console.log(Component);
console.dir(HTMLElement);

// @ts-ignore
// document.body.appendChild(Component)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        { Component }
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Olá, mundo!!!!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
