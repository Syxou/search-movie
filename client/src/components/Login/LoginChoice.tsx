import React from 'react';
import GoogleLogin from 'react-google-login'

import UserMeta from '../UserMeta/UserMeta';
import { login } from '../../slice/serviceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../slice/serviceSlice';

const LoginChoice: React.FC = () => {
    const dispatch = useDispatch();
    const { service } = useSelector(selectUser);

    const handleLogin = (googleData: any) => {
        dispatch(login(googleData.tokenId));
    }

    const renderLogin = () => {
        if (service.token) {
            return <UserMeta />
        }
        return (
            <GoogleLogin
                clientId="1005266927467-r75m0g9pn25q1vkob3hls1h1hvrq4981.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
            />
        )
    }

    return (
        <div>
            {renderLogin()}
        </div>
    )
}

export default LoginChoice;
