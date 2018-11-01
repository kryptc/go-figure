//  import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker()

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();;
