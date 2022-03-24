import * as React from "react";
import './LoginForm.css'
import { TextInput } from "./Input/TextInput";

export class LoginForm extends React.Component {
  constructor(props: any) {
    super(props);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log("submit");
    event.preventDefault();
  }

  render(): React.ReactNode {
    return <section className="LoginSection">
      <h1>Login</h1>
      <p>Welcome back! Login to access full functionality in EventColab.</p>
      <p>Did you <a href="" className='highlighted'>forget your password?</a></p>

      <form onSubmit={this.handleSubmit} className="LoginForm">
        <TextInput placeHolder='Login' />
        <TextInput placeHolder='Password' overrideType="password" />
        <input type="submit" value="submit" />
      </form>
    </section>;
  }
}
