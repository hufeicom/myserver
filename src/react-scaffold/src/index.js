import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {Mantou, Baozi} from './App';
import * as serviceWorker from './serviceWorker';

import Parent from './render-prop'
import Hoc from './hoc'

ReactDOM.render(<div><App></App><Parent></Parent> <Hoc></Hoc><Mantou></Mantou><Baozi></Baozi></div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
