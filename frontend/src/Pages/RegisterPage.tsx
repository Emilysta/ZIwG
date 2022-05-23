import { RegisterForm } from 'Components/RegisterForm';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppSelector } from 'Utils/Store';
import './FormWrapper.scss';



const RegisterPage = () => {
    const isLogged = useAppSelector((state: RootState) => state.userLogin.isLoggedIn)
    const navigate = useNavigate();
    React.useEffect(() => {
        if (isLogged) {
            navigate('/', { replace: true })
        }
    }, [])
    return (
        <div className="formWrapper">
            <RegisterForm />
        </div>
    )
}

export default RegisterPage