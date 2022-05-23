import * as React from "react";
import './FormWrapper.scss'
import { RootState, useAppSelector } from "Utils/Store";
import { useNavigate } from "react-router-dom";
import { ResetPasswordForm } from "Components/ResetPasswordForm";

export default function ResetPasswordPage() {
    const isLogged = useAppSelector((state: RootState) => state.userLogin.isLoggedIn)
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isLogged) {
            navigate('/', { replace: true })
        }
    }, [])

    return (
        <div className="formWrapper">
            <ResetPasswordForm />
        </div>
    )
}
