import * as React from "react";
import './RegisterForm.scss'
import { TextInput } from "./Input/TextInput";
import { StateButton } from "./Input/StateButton";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { Divider } from "./Divider";
import { validLogin, validEmail, passwordValidate, ValidationFun, Validator } from "Utils/TextInputValidation";

export function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')

    const checkConfirm = (inputValue: string) => {
        return password.length !== 0 && confirmPassword.length !== 0 && password !== confirmPassword
            ? 'Passwords do not match'
            : null
    }

    const userNameCheck = new Validator(validLogin)
    const emailCheck = new Validator(validEmail)
    const passwdCheck = new Validator(...passwordValidate)
    const confirmedPasswdCheck = new Validator(checkConfirm)

    const validations = [userNameCheck, emailCheck, passwdCheck, confirmedPasswdCheck]

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("submit");
        event.preventDefault();
        validateAndSend();
    }

    const renderForm = (
        <form onSubmit={handleSubmit} className="RegisterForm">
            <TextInput placeHolder='Username' onChange={(e) => setUsername(e.target.value)} validate={userNameCheck} />
            <TextInput placeHolder='E-mail' onChange={(e) => setEmail(e.target.value)} validate={emailCheck} />
            <TextInput placeHolder='Password' overrideType="password" onChange={(e) => setPassword(e.target.value)} validate={passwdCheck} />
            <TextInput placeHolder='Confirm password' overrideType="password" onChange={(e) => setConfirmPassword(e.target.value)} validate={confirmedPasswdCheck} />
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
        console.log(isValid)
    }

    function sendRequest() {
        const body = JSON.stringify({
            firstName: "string",
            lastName: "string",
            password: "string",
            displayName: "string",
            dateOfBirth: "2022-04-02T18:22:55.829Z",
            email: "string"
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
                // todo handle registration
            }
            else {
                setErrorMsg("Error");
            }
        }).catch(() => {
            setErrorMsg("Communication error");
        });
    }
}
