import * as React from "react";
import './LoginForm.scss'
import { TextInput } from "./Input/TextInput";
import { StateButton, ButtonStateEnum } from "./Input/StateButton";
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from "Utils/UserSlice";
import { useAppDispatch } from "Utils/Store";
import { login } from "Utils/UserLoginSlice";

export function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPasswd] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginRequest, loginResult] = userApi.useLoginMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
    await loginRequest({ email: email, password: password }).unwrap()
      .then(data => {
        console.log(loginResult.data);
        dispatch(login());
        navigate('/user', { replace: true });
      })
      .catch(err => console.error(err));
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
  </section >;
}
