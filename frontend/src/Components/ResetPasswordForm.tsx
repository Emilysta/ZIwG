import * as React from "react";
import './ResetPasswordForm.scss';
import { TextInput } from "./Input/TextInput";
import { StateButton } from "./Input/StateButton";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { userApi } from "Utils/UserApiSlice";
import { passwordValidate } from "Utils/TextInputValidation";
import { ArrowRight } from 'react-bootstrap-icons';
import Throbber from "./Throbber";
import { useState } from "react";
import { Validator } from "Utils/Validator";
import { ErrorMsg } from "./Input/ErrorMsg";

export function ResetPasswordForm() {
    const [searchParams] = useSearchParams();
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [throbber, setThrobber] = React.useState(false);
    const [errorConfirmPass, setErrorConfirmPass] = useState('')
    const navigate = useNavigate();

    const [sendResetPasswordRequest] = userApi.useLazyResetPasswordQuery();

    const checkConfirm = (value: string) =>
        password.length !== 0 && password !== value
            ? 'Passwords do not match'
            : null;

    const passwdCheck = new Validator(passwordValidate);
    const confirmedPasswdCheck = new Validator([checkConfirm]);
    const validations = [passwdCheck, confirmedPasswdCheck];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateAndSend();
    }

    React.useEffect(() => {
        if (password.length !== 0 && password !== confirmPassword) {
            setErrorConfirmPass('Passwords do not match');
        }
        else
            setErrorConfirmPass('');
    }, [password, confirmPassword]);

    function validateAndSend() {
        const isValid = validations.every((v) => v.isValid());
        if (!isValid)
            setError('Email is incorrect');
        else
            sendRequest();
    }

    async function sendRequest() {
        setThrobber(true);
        const email = searchParams.get('email');
        const token = searchParams.get('token');
        const encodedToken = encodeURI(token);
        const encodedToken2 = encodedToken.replace(/%20/g, '+');
        await sendResetPasswordRequest({ userEmail: email, password: password, token: encodedToken2 }).unwrap()
            .then(_ => {
                let i = 5;
                const interval = setInterval(() => {
                    setError(`Password has been reset. Redirection to Login page in... ${i}s`);
                    i--;
                }, 1000)
                setTimeout(() => {
                    clearInterval(interval);
                    navigate('/logIn', { replace: true });
                }, 5000);

            })
            .catch(err => {
                console.log(err);
                setError('Link expired. Please try sending reset mail again.');
                setThrobber(false);
            });
    }

    return <div className="resetPasswordSection">
        <h1>Reset Password</h1>
        <p>Please enter your new password.</p>

        <form onSubmit={handleSubmit} className="resetPasswordForm">
            <input autoComplete={'off'} hidden />
            <TextInput placeHolder='Password' overrideType="password" onChange={(v) => setPassword(v)} validate={passwdCheck} autoComplete={'new-password'} required />
            <TextInput placeHolder='Confirm password' overrideType="password" onChange={(v) => setConfirmPassword(v)} validate={confirmedPasswdCheck} autoComplete={'new-password'} required additionalError={errorConfirmPass} />
            <>
                <StateButton type="submit" value="Reset password" />
                {throbber && <Throbber className='registerThrobber' />}
            </>
            {error && <ErrorMsg>{error}</ErrorMsg>}
        </form>
        <p><Link to='/logIn' className='highlighted'>
            Go back to login page
            <ArrowRight className="resetPassArrowInLink" />
        </Link></p>
    </div >;
}
