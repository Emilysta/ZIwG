import logo from '../images/logo.svg';
import '../Assets/general.css'
import './App.css';
import './HeadBar.css'
import './TextInput.css'
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
    const list = ["Marisa", "Julianne", "Jakob"]
    return <li className='VerticalMenu'>
      {list.map((name, i) => {
        return <MenuItem key={i}>{name}</MenuItem>
      })}
      <HeaderUserArea />
    </li>
  }
}

class MenuItem extends React.Component {
  render(): React.ReactNode {
    return <ul><a>{this.props.children}</a></ul>
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
        <img width="20px" height="20px"></img>
        Logout
      </MenuItem>
    else
      return <MenuItem>Sign In</MenuItem>
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
    return <form onSubmit={this.handleSubmit} className="LoginForm">
      <TextInput placeHolder='Login' name="login" />
      <TextInput placeHolder='Password' name="password" overrideType="password" />
      <input type="submit" value="submit" />
    </form>
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
