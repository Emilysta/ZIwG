import * as React from "react";
import './LoginForm.scss'
import { TextInput } from "./Input/TextInput";
import { StateButton, ButtonStateEnum } from "./Input/StateButton";
import { Link } from 'react-router-dom';

export function LoginForm() {
  const [email, setLogin] = React.useState('');
  const [password, setPasswd] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // todo it's test code
    event.preventDefault();
    console.log("submit");

    const body = JSON.stringify({
      email: email,
      password: password,
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

  const minimalLength = 0;

  const buttonState = (email.length > minimalLength && password.length > minimalLength)
    ? ButtonStateEnum.Active
    : ButtonStateEnum.Inactive

  return <section className="LoginSection">
    <h1>Login</h1>
    <p>Welcome back! Login to access full functionality in EventColab.</p>
    <p>Did you <Link to='/' className='highlighted'>forget your password?</Link></p>

    <form onSubmit={handleSubmit} className="LoginForm">
      <TextInput placeHolder='Login' onChange={e => setLogin(e.target.value)} />
      <TextInput placeHolder='Password' overrideType="password" onChange={e => setPasswd(e.target.value)} />
      <Link to='/user' className="buttonLink">
        <StateButton state={buttonState} type="submit" value="Submit" />
      </Link>
    </form>
    <p><Link to='/register' className='highlighted'>No account?</Link></p>
  </section >;
}
