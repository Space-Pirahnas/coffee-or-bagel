import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/client/components/App.jsx';
import reducers from '../src/client/reducers/index.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

it('renders without crashing', () => {
  const store = createStore(reducers)
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
});