import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { useState } from 'react';

function Batata () {
  const [canViewApp, setCanViewApp] =
    useState(true)
  return <>
    {
      canViewApp &&
        <App />
    }
    <button
      onClick={() => {
        setCanViewApp(!canViewApp)
      }}
    >
      toggle
    </button>
  </>
}

ReactDOM.render(
  <React.StrictMode>
    <Batata />
  </React.StrictMode>,
  document.getElementById('root')
);
