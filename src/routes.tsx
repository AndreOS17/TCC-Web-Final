import React from 'react';

import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Main from './pages/Main/main';
import Loading from './pages/Loading/loading';
import Saved from './pages/Saved/saved';
import All from './pages/All/all';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/loading/:time" component={Loading} />
      <Route path="/all" component={All} />
      <Route path="/saved/:id" component={Saved} />
    </Switch>
  </BrowserRouter>
);

export default Routes;