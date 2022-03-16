import logo from '../images/logo.svg';
import './App.css';
import * as React from "react";

type AppProps = { num: number };

//export const App = ({ num }: AppProps) => <h1>Hello world React! Num: {num}</h1>;

function Test(props: any) {
  return (
    <h1>Elo! {(new Date().toTimeString())}</h1>
  )
}

interface IClockProps {
}

interface IClockState {
  date?: Date,
}

class Clock extends React.Component<IClockProps, IClockState> {
  constructor(props: any) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount(): void {
    setInterval(() => this.setState({ date: new Date() }), 1000)
  }

  render() {
    return (
      <div>
        <h1>Witaj, świecie!</h1>
        <h2>Aktualny czas: {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

interface ICatProps {
  mouse: any
}

interface ICatStates {
}

class Cat extends React.Component<ICatProps, ICatStates> {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class MouseWithCat extends React.Component {
  constructor(props: any) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event: any) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {/*
          Moglibyśmy w tym miejscu po prostu zamienić <p> na <Cat>... ale później
          musielibyśmy stworzyć oddzielny komponent <MouseWithSomethingElse>
          dla każdego przypadku użycia, dlatego też <MouseWithCat>
          nie jest jeszcze w pełni używalny wielokrotnie.
        */}
        <Cat mouse={this.state} />
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Porusz myszką!</h1>
        <MouseWithCat />
      </div>
    );
  }
}




function App({ num }: AppProps) {
  return (
      <MouseTracker />
  );
}

export { App };
