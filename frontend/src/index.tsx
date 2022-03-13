import './index.css';
import reportWebVitals from './reportWebVitals';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from "./App/App";

ReactDOM.render(
  <App num={1337} />, document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
