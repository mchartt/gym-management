import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import UsersPage from './components/UsersPage';
import RegisterUser from './components/RegisterUser';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/users" component={UsersPage} />
          <Route path="/register" component={RegisterUser} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

