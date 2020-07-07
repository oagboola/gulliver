import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App/App';
import Firebase, { FirebaseContext } from './components/Firebase';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDom.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
