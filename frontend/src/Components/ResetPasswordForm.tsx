import * as React from "react";
import './ResetPasswordForm.scss';
import { TextInput } from "./Input/TextInput";
import { StateButton, ButtonStateEnum } from "./Input/StateButton";
import { Link } from 'react-router-dom';
import { userApi } from "Utils/UserApiSlice";
import { ErrorMsg } from "./Input/ErrorMsg";
import { validEmail } from "Utils/TextInputValidation";
import { ArrowRight } from 'react-bootstrap-icons';
import Throbber from "./Throbber";
import { Divider } from "./Divider";

export function ResetPasswordForm() {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState(false);
    const [throbber, setThrobber] = React.useState(false);

    const [sendPassRecoveryEmailRequest] = userApi.useLazySendPasswordRecoveryEmailQuery();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateAndSend();
    }

    function validateAndSend() {
        let isValid: boolean = true;
        if (validEmail(email) !== null) isValid = false;
        if (!isValid)
            setError(true);
        else
            sendRequest();
    }

    async function sendRequest() {
        setThrobber(true);
        await sendPassRecoveryEmailRequest({ userEmail: email }).unwrap()
            .catch(err => {
                console.log(err);
                setError(true)
                setThrobber(false);
            });
    }

    return <div className="resetPasswordSection">
        <h1>Reset Password</h1>
        <p>Please enter your email address! <br></br>We'll send you an e-mail with reset link.</p>

        <form onSubmit={handleSubmit} className="resetPasswordForm">
            <TextInput placeHolder='Email' onChange={v => setEmail(v)} autoComplete={'email'} required />
            <>
                <StateButton state={ButtonStateEnum.Active} type="submit" value="Send e-mail" />
                {throbber && <Throbber className='resetPasswordThrobber' />}
            </>
            {error && <ErrorMsg>Email is incorrect or sth went wrong</ErrorMsg>}
        </form>

        <p><Link to='/register' className='highlighted'>No account?</Link></p>
        <Divider text='Or' size={360} />
        <p><Link to='/logIn' className='highlighted'>Go back to login page <ArrowRight className="resetPassArrowInLink" /></Link></p>
    </div >;
}
