import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Home from './views/Home.view';
import NotFound404 from './views/NotFound404.view';
import Contact from './views/Contact.view';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/contato">Contato</a></li>
        </ul>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="*" element={<NotFound404 />} />     
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();