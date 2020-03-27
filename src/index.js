import polyfills from 'utils/polyfills.js';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

Promise.all([polyfills]).then(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
