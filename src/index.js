import { Provider } from 'react-redux';

import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store/store';
import App from './components/app/App';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


