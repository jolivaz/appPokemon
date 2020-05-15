import React from "react";
import Home from './components/home/home'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function Routes() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Home}/>
      </Switch>
    </Router>
  );
}

export default Routes;
