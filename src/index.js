import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'views/Root';

import { Provider } from "react-redux";
import store from "./redux/redux-store";

import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
