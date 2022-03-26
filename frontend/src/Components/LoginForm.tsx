import * as React from "react";
import './LoginForm.css'
import { TextInput } from "./Input/TextInput";
import { Button, ButtonStateEnum } from "./Input/Button";
import { Link } from 'react-router-dom';

export class LoginForm extends React.Component {
  login: React.RefObject<TextInput> = React.createRef()
  password: React.RefObject<TextInput> = React.createRef()
  submit: React.RefObject<Button> = React.createRef()

  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // todo it's test code
    event.preventDefault();
    console.log("submit");

    const body = JSON.stringify({
      email: this.password.current.value,
      password: this.password.current.value,
    });

    fetch("api/user/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body,
    })
      .then((e) => {
        console.log(e)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const minimalLength = 0;
    if (this.login.current.value.length > minimalLength && this.password.current.value.length > minimalLength)
      this.submit.current.setState({ state: ButtonStateEnum.Active })
    else
      this.submit.current.setState({ state: ButtonStateEnum.Inactive })
  }

  render(): React.ReactNode {
    return <section className="LoginSection">
      <h1>Login</h1>
      <p>Welcome back! Login to access full functionality in EventColab.</p>
      <p>Did you <Link to='/' className='highlighted'>forget your password?</Link></p>

      <form onSubmit={this.handleSubmit} className="LoginForm">
        <TextInput ref={this.login} placeHolder='Login' onChange={this.handleChange} />
        <TextInput ref={this.password} placeHolder='Password' overrideType="password" onChange={this.handleChange} />
        <Button ref={this.submit} type="submit" value="Submit" />
      </form>
      <p><Link to='/register' className='highlighted'>No account?</Link></p>
    </section>;
  }
}
