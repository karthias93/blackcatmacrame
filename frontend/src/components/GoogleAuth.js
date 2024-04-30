import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../actions/userActions';
import { useDispatch } from 'react-redux';

const GoogleAuth = () => {
    const dispatch = useDispatch()
    return (
        <GoogleLogin
            onSuccess={async credentialResponse => {
                console.log(credentialResponse);
                dispatch(googleAuth(credentialResponse));
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    );
};

export default GoogleAuth;