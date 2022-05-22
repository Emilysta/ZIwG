import * as React from "react";
import './RegisterForm.scss'
import { TextInput } from "./Input/TextInput";
import { StateButton } from "./Input/StateButton";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Divider } from "./Divider";
import { validLogin, validEmail, passwordValidate, isRequired } from "Utils/TextInputValidation";
import { Validator } from "Utils/Validator";
import { userApi } from "Utils/UserApiSlice";
import Throbber from "./Throbber";

export function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const getDefaultUsername = () => (firstName || lastName) && firstName + ' ' + lastName
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')
    const [throbber, setThrobber] = React.useState(false);

    const checkConfirm = (value: string) =>
        password.length !== 0 && value.length !== 0 && password !== value
            ? 'Passwords do not match'
            : null

    const navigate = useNavigate();
    const [registerRequest] = userApi.useRegisterMutation();

    const firstNameCheck = new Validator();
    const lastNameCheck = new Validator();
    const userNameCheck = new Validator();
    const emailCheck = new Validator([validEmail]);
    const passwdCheck = new Validator(passwordValidate);
    const confirmedPasswdCheck = new Validator([checkConfirm]);

    const validations = [firstNameCheck, lastNameCheck, userNameCheck, emailCheck, passwdCheck, confirmedPasswdCheck];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateAndSend();
    }

    const renderForm = (
        <form onSubmit={handleSubmit} className="RegisterForm">
            <TextInput placeHolder='First name' onChange={(v) => setFirstName(v)} validate={firstNameCheck} autoComplete={'given-name'} required />
            <TextInput placeHolder='Last name' onChange={(v) => setLastName(v)} validate={lastNameCheck} autoComplete={'family-name'} required />
            <TextInput placeHolder='Display name' onChange={(v) => setDisplayName(v)} validate={userNameCheck} autoComplete={'username'} required />
            <TextInput placeHolder='E-mail' onChange={(v) => setEmail(v)} validate={emailCheck} autoComplete={'email'} required />
            <TextInput placeHolder='Password' overrideType="password" onChange={(v) => setPassword(v)} validate={passwdCheck} autoComplete={'new-password'} required />
            <TextInput placeHolder='Confirm password' overrideType="password" onChange={(v) => setConfirmPassword(v)} validate={confirmedPasswdCheck} autoComplete={'new-password'} required />
            <>
                <StateButton type="submit" value="Create account" />
                {throbber && <Throbber className='registerThrobber' />}
            </>
            {errorMsg.length > 0 && <p className='inputError errorBox'>{errorMsg}</p>}
        </form>
    );

    return (
        <section className="RegisterSection">
            <h1>Sign Up</h1>
            <p className="text1">Sign up to access full functionality in EventColab</p>
            {renderForm}
            <Divider text='Or' size={360} />
            <p className="text2">Already have an account?<Link to='/logIn' className='highlighted'> Login Here</Link></p>
        </section>
    );

    function validateAndSend() {
        const isValid = validations.every((v) => v.isValid());
        if (isValid) sendRequest();
    }

    function sendRequest() {
        setThrobber(true);
        registerRequest({
            firstName: firstName,
            lastName: lastName,
            password: password,
            displayName: displayName,
            dateOfBirth: new Date("2020-01-01T10:00:00.000Z"), // todo handle date of birth
            email: email
        }).unwrap()
            .then(data => {
                console.log(data);
                navigate('/login', { replace: true });
            })
            .catch(err => {
                console.error(err);
                setErrorMsg("Register failure");
                setThrobber(false);
            })
    }
}
