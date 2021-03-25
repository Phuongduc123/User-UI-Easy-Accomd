import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'




import App from './App';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux';
import * as serviceWorker from './serviceWorker';
import createSagaMiddleware from "redux-saga";
import allReducers from './redux/reducers/index.js';
import rootSaga from "./redux/sagas/rootSaga";
import 'antd/dist/antd.css';
import './index.css';
import 'react-notifications/lib/notifications.css';




const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  allReducers,
  applyMiddleware(sagaMiddleware),
);


sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
