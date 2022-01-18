import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Home from './views/Home.view';
import NotFound404 from './views/NotFound404.view';
import Contact from './views/Contact.view';
import UserView from './views/User.view';
import CalcView from './views/Calc.view';
import NavBar from './components/NavBar';

ReactDOM.render(
  <React.StrictMode>
    <div>
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
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
