import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Header
import Header from '../components/Header';

// pages
import Home from '../pages/Home';
import Hero from '../pages/Hero';
import API from '../pages/API';

const PageRoutes = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/hero" component={Hero} />
      <Route exact path="/api" component={API} />
    </Switch>
  </Router>
);

export default PageRoutes;
