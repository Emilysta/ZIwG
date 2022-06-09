import * as React from "react";
import './FormWrapper.scss'
import { RootState, useAppSelector } from "Utils/Store";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordForm } from "Components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    const isLogged = useAppSelector((state: RootState) => state.userLogin.isLoggedIn)
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isLogged) {
            navigate('/', { replace: true })
        }
    }, [])

    return (
        <div className="formWrapper">
            <ForgotPasswordForm />
        </div>
    )
}
