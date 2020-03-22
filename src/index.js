import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Cookies from 'js-cookie';
import axios from 'axios';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer,
  compose(applyMiddleware(thunk), composeWithDevTools())
);

export const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.interceptors.request.use(
  req => {
    req.headers['x-csrf-token'] = Cookies.get('csrf-token');
    return req;
  }
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
