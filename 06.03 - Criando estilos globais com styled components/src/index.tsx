import React from 'react';
import ReactDOM from 'react-dom';
import './core/imports.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Home from './app/views/Home.view';
import NotFound404 from './app/views/NotFound404.view';
import Contact from './app/views/Contact.view';
import UserView from './app/views/User.view';
import CalcView from './app/views/Calc.view';
import NavBar from './app/components/NavBar';
import GlobalStyles from './core/globalStyles';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path={'/'} exact component={Home} />
        <Route path={'/contato'} exact component={Contact} />
        <Route path={'/usuario/:userId'} component={UserView} />
        <Route path={'/calc/:a/:b'} component={CalcView} />
        <Route component={NotFound404} />
      </Switch>
    </BrowserRouter>
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
