import * as React from "react";
import { LoginForm } from 'Components/LoginForm'
import './FormWrapper.scss'
import { RootState, useAppSelector } from "Utils/Store";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const isLogged = useAppSelector((state: RootState) => state.userLogin.isLoggedIn)
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isLogged) {
            navigate('/', { replace: true })
        }
    }, [])

    return (
        <div className="formWrapper">
            <LoginForm />
        </div>
    )
}

export default LoginPage;