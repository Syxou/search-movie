import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login'

const LoginChoice = () => {

    const handleLogin = async (googleData: any) => {
        console.log(googleData)
        await axios({
            method: "POST",
            url: "http://localhost:3001/auth/",
            data: {
                token: googleData.tokenId
            },
        }).then((res) => {
            console.log('data', res.data)
        }).catch((err) => {
            console.log('err', err)
        })
    }

    return (
        <div>
            <GoogleLogin
                clientId="1005266927467-r75m0g9pn25q1vkob3hls1h1hvrq4981.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
            />

        </div>
    )
}

export default LoginChoice;
