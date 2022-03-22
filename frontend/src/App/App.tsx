import logo from '../images/logo.svg';
import '../Assets/general.css'
import './App.css';
import './HeadBar.css'
import './Input.css'
import './LoginForm.css'
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

class VerticalMenu extends React.Component {
  render(): React.ReactNode {
    return <li className='VerticalMenu'>
      <MenuItem>Events</MenuItem>
      <HeaderUserArea />
    </li>
  }
}

class MenuItem extends React.Component {
  render(): React.ReactNode {
    return <ul><a>{this.props.children}</a></ul>
  }
}

class HighlightedMenuItem extends React.Component {
  render(): React.ReactNode {
    return <ul><a className='highlighted'>{this.props.children}</a></ul>
  }
}

class HeadBar extends React.Component {
  render() {
    return <div className='HeadBar'>
      <nav>
        <Logotype />
        <VerticalMenu />
      </nav>
    </div>
  }
}

class HeaderUserArea extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { logged: Math.random() < 0.5 }
  }

  render(): React.ReactNode {
    if (this.state.logged)
      return <MenuItem>
        <img />
        Logout
      </MenuItem>
    else
      return <>
        <MenuItem>Log In</MenuItem>
        <HighlightedMenuItem>Sign In</HighlightedMenuItem>
      </>
  }
}

type TextInputProps = { placeHolder: string, name?: string, overrideType?: string }
type TextInputState = { value: string }

class TextInput extends React.Component<TextInputProps, TextInputState> {
  constructor(props: any) {
    super(props)
    this.state = { value: "" }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    const currentValue = event.currentTarget.value;
    this.setState({ value: currentValue })
  }

  render(): React.ReactNode {
    if (this.props.name)
      return <>
        <label>{this.props.name}</label>
        {this.renderInput()}
      </>
    else
      return this.renderInput()
  }

  private renderInput(): React.ReactNode {
    return <input type={this.props.overrideType ?? "text"} value={this.state.value} placeholder={this.props.placeHolder} onChange={this.handleChange} />;
  }
}

class LoginForm extends React.Component {
  constructor(props: any) {
    super(props)
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log("submit")
    event.preventDefault()
  }

  render(): React.ReactNode {
    return <section className="LoginSection">
      <h1>Login</h1>
      <p>Welcome back! Login to access full functionality in EventColab.</p>
      <p>Did you <a href="">forget your password?</a></p>

      <form onSubmit={this.handleSubmit} className="LoginForm">
        <TextInput placeHolder='Login' />
        <TextInput placeHolder='Password' overrideType="password" />
        <input type="submit" value="submit" />
      </form>
    </section>
  }
}

function App({ num }: AppProps) {
  return (
    <div>
      <HeadBar />
      <main>
        <LoginForm />
      </main>
    </div>
  );
}

export { App };
