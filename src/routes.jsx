import React from 'react';
import { IndexRoute, Route }  from 'react-router';
import App from './client/components/App';
import AddMessagePage from './client/components/AddMessagePage';
import MessagesPage from './client/components/MessagesPage';

export default (
  <Route component={App} path='/'>
    <IndexRoute component={AddMessagePage} />
    <Route component={MessagesPage} path='messages' />
  </Route>
);
