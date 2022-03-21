import logo from '../images/logo.svg';
import './App.css';
import * as React from "react";

type AppProps = { num: number };

//export const App = ({ num }: AppProps) => <h1>Hello world React! Num: {num}</h1>;

function App({ num }: AppProps) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export { App };
