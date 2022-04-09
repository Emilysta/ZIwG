import './index.scss';
import reportWebVitals from './reportWebVitals';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from "./App/App";
import Popup from 'Components/Popup';

ReactDOM.render(
  <div className='theme-light'>
    <App />
    <Popup>
      <header> Ipsam ad voluptatem quasi voluptas </header>
      <main> Ipsam ad voluptatem quasi voluptas non culpa explicabo consequatur dolores. Voluptas a et enim similique sapiente tempore. Aut et commodi vel quia. Ut molestiae sint. Quia repellendus voluptatem sed. Tenetur harum aliquam mollitia officiis molestias voluptatum officiis. </main>
      <footer> Voluptas a et enim similique sapiente tempore </footer>
    </Popup>
  </div>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
