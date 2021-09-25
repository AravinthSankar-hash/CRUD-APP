import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import './index.css';
import App from './App';
import Login from './components/login/login';
import Users from './components/users/users';
import Register from './components/register/register';
import UnAuthorized from './components/unauthorized/unauthorized';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/unauthorized" component={UnAuthorized} />
        <Route path="/users" component={Users} />
      </div>
    </Router>
)

ReactDOM.render(routing,
  document.getElementById('root')
);
