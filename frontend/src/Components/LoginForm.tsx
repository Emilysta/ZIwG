import * as React from "react";
import './LoginForm.scss'
import { TextInput } from "./Input/TextInput";
import { StateButton, ButtonStateEnum } from "./Input/StateButton";
import { Link } from 'react-router-dom';
import { postJson } from "Utils/FetchUtils";
import ButtonWithIcon from "./Input/ButtonWithIcon";
import { Google } from "react-bootstrap-icons";
import { Divider } from "./Divider";

export function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPasswd] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");

    window.location.href = '/user'
    return; // todo disabled login request

    postJson("api/user/login", {
      email: email,
      password: password,
    }).then((data) => {
      console.log(data)
      if (data.ok) {
      }
      else {
      }
    }).catch((reason) => {
      console.log(reason)
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
      <TextInput placeHolder='Email' onChange={v => setEmail(v)} />
      <TextInput placeHolder='Password' overrideType="password" onChange={v => setPasswd(v)} />
      <StateButton state={buttonState} type="submit" value="Submit" />
    </form>

    <p><Link to='/register' className='highlighted'>No account?</Link></p>

    <Divider text='Or' size={360} />

    {/* todo https://ziwg.bieda.it/api/User/google-login */}
    <ButtonWithIcon text="Login with Google" isActive={true} link="" icon={<Google />} background={true} />

  </section >;
}
