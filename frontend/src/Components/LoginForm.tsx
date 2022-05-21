import * as React from "react";
import './LoginForm.scss'
import { TextInput } from "./Input/TextInput";
import { StateButton, ButtonStateEnum } from "./Input/StateButton";
import ButtonWithIcon, { ButtonStyle } from "./Input/ButtonWithIcon";
import { Google } from "react-bootstrap-icons";
import { Divider } from "./Divider";
import { Link, useNavigate } from 'react-router-dom';
import { loginUserThunk, userApi } from "Utils/UserApiSlice";
import { useAppDispatch } from "Utils/Store";
import { ErrorMsg } from "./Input/ErrorMsg";
import { isRequired, validEmail } from "Utils/TextInputValidation";

export function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPasswd] = React.useState('');
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginRequest] = userApi.useLoginMutation();
  const [googleLoginRequest] = userApi.useGoogleLoginMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateAndSend();
  }

  function validateAndSend() {
    let isValid: boolean = true;
    if (validEmail(email) !== null) isValid = false;
    if (isRequired(password) !== null) isValid = false;
    if (isValid) sendRequest();
    if (!isValid) setError(true);
  }

  async function sendRequest() {
    await loginRequest({ email: email, password: password }).unwrap()
      .then(async data => {
        await dispatch(loginUserThunk());
        navigate('/user', { replace: true });
      })
      .catch(err => {
        setError(true)
      });
  }

  const googleAuth = () => {
    // bug CORS issue
    googleLoginRequest({}).unwrap()
      .then(data => {
        console.log(data)
        window.location.replace(data)
      })
      .catch(err => console.error(err))
  }

  return <div className="LoginSection">
    <h1>Login</h1>
    <p>Welcome back! Login to access full functionality in EventColab.</p>
    <p>Did you <Link to='/' className='highlighted'>forget your password?</Link></p>

    <form onSubmit={handleSubmit} className="LoginForm">
      <TextInput placeHolder='Email' onChange={v => setEmail(v)} autoComplete={'email'} required />
      <TextInput placeHolder='Password' overrideType="password" onChange={v => setPasswd(v)} autoComplete={'current-password'} required />
      {error && <ErrorMsg>The password or email is incorrect</ErrorMsg>}
      <StateButton state={ButtonStateEnum.Active} type="submit" value="Log in" />
    </form>

    <p><Link to='/register' className='highlighted'>No account?</Link></p>

    <Divider text='Or' size={360} />

    <ButtonWithIcon text="Login with Google" isActive={true} link="" icon={<Google />} style={ButtonStyle.Background} onClickAction={googleAuth} />
  </div >;
}
