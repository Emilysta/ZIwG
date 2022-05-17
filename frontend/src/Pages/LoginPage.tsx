import * as React from "react";
import { LoginForm } from 'Components/LoginForm'
import './FormWrapper.scss'

function LoginPage() {
    return (
        <div className="formWrapper">
            <LoginForm />
        </div>
    )
}

export default LoginPage;