import * as React from "react";
import './RegisterForm.css'
import { TextInput } from "./Input/TextInput";
import { Button } from "./Input/Button";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { Divider } from "./Divider";

export function RegisterForm() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("submit");
        event.preventDefault();
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const checkIfError = (inputValue: string) => {
        if (inputValue.length < 5)
            return 'tooShort';
        else
            return '';
    }

    const checkPasswordError = (inputValue: string) => {
        if (password.length !== 0 && confirmpassword.length !== 0 && password !== confirmpassword)
            return 'Passwords do not match';
        else
            return '';
    }

    const renderForm = (
        <form onSubmit={handleSubmit} className="RegisterForm">
            <TextInput placeHolder='Username' onChange={(e) => setUsername(e.target.value)} checkIfError={checkIfError} />
            <TextInput placeHolder='E-mail' onChange={(e) => setEmail(e.target.value)} checkIfError={checkIfError} />
            <TextInput placeHolder='Confirm password' overrideType="password" onChange={(e) => setPassword(e.target.value)} checkIfError={checkIfError} />
            <TextInput placeHolder='Password' overrideType="password" onChange={(e) => setConfirmPassword(e.target.value)} checkIfError={checkPasswordError} />
            <Button type="submit" value="Create account" />
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
}