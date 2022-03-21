import logo from '../images/logo.svg';
import '../Assets/general.css'
import './App.css';
import './HeadBar.css'
import * as React from "react";

type AppProps = { num: number };

class Logo extends React.Component {
  render(): React.ReactNode {
    return <img src={logo} className="Logo" />
  }
}

class Logotype extends React.Component {
  render(): React.ReactNode {
    return <div className='Logotype'>
      <Logo />
      <a>EventColab</a>
    </div>
  }
}

class TopMenu extends React.Component {
  render(): React.ReactNode {
    const list = ["Marisa", "Julianne", "Jakob"]
    return <li className='TopMenu'>
      {list.map((name, i) => {
        return <ul key={i}><a>{name}</a></ul>
      })}
    </li>
  }
}

class HeadBar extends React.Component {
  render() {
    return <div className='HeadBar'>
      <nav>
        <Logotype />
        <TopMenu />
      </nav>
    </div>
  }
}

function App({ num }: AppProps) {
  return (
    <div className="App">
      <HeadBar />
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
