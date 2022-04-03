import * as React from "react";
import './RegisterForm.scss'
import { TextInput } from "./Input/TextInput";
import { StateButton } from "./Input/StateButton";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { Divider } from "./Divider";
import { validLogin, validEmail, passwordValidate, ValidationFun, Validator } from "Utils/TextInputValidation";

export function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const getDefaultUsername = () => (firstName || lastName) && firstName + ' ' + lastName
    const [username, setUsername] = useState('');
    const [defaultUsername, setDefault] = useState(getDefaultUsername())
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')

    React.useEffect(() => setDefault(getDefaultUsername()), [firstName, lastName])

    const checkConfirm = (value: string) =>
        password.length !== 0 && value.length !== 0 && password !== value
            ? 'Passwords do not match'
            : null

    const firstNameCheck = new Validator()
    const lastNameCheck = new Validator()
    const userNameCheck = new Validator(validLogin)
    const emailCheck = new Validator(validEmail)
    const passwdCheck = new Validator(...passwordValidate)
    const confirmedPasswdCheck = new Validator(checkConfirm)

    const validations = [firstNameCheck, lastNameCheck, userNameCheck, emailCheck, passwdCheck, confirmedPasswdCheck]

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("submit");
        event.preventDefault();
        validateAndSend();
    }

    const renderForm = (
        <form onSubmit={handleSubmit} className="RegisterForm">
            <TextInput placeHolder='First name' onChange={(v) => setFirstName(v)} validate={firstNameCheck} />
            <TextInput placeHolder='Last name' onChange={(v) => setLastName(v)} validate={lastNameCheck} />
            <TextInput placeHolder='Username' defaultValue={defaultUsername} onChange={(v) => setUsername(v)} validate={userNameCheck} />
            <TextInput placeHolder='E-mail' onChange={(v) => setEmail(v)} validate={emailCheck} />
            <TextInput placeHolder='Password' overrideType="password" onChange={(v) => setPassword(v)} validate={passwdCheck} />
            <TextInput placeHolder='Confirm password' overrideType="password" onChange={(v) => setConfirmPassword(v)} validate={confirmedPasswdCheck} />
            <StateButton type="submit" value="Create account" />
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
        const isValid = validations.every((v) => v.isValid())
        if (isValid) sendRequest()
    }

    function sendRequest() {
        const body = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            password: password,
            displayName: username,
            dateOfBirth: "2020-01-01T10:00:00.000Z", // todo handle date of birth
            email: email
        });

        fetch('/api/user/register', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body,
        }).then(data => {
            if (data.ok) {
                window.location.href = '/login'
            }
            else {
                setErrorMsg("Error");
            }
        }).catch(() => {
            setErrorMsg("Communication error");
        });
    }
}
