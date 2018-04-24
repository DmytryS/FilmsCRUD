import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import FilmsIndex from './pages/FilmsIndex';
import FilmsNew from './pages/FilmsNew';
import FilmsShow from './pages/FilmsShow';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={FilmsIndex} />
    <Route path="films/new" component={FilmsNew} />
    <Route path="films/:id" component={FilmsShow} />
  </Route>
);
