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
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log("submit");
    event.preventDefault();
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
