import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { googleAuth } from '../actions/userActions';
import { useDispatch } from 'react-redux';
import { REACT_APP_GOOGLEAUTH_CLIENTID } from '../../constants';

const GoogleAuth = () => {
    const clientId = REACT_APP_GOOGLEAUTH_CLIENTID;
    const dispatch = useDispatch()
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={async credentialResponse => {
                    console.log(credentialResponse);
                    dispatch(googleAuth(credentialResponse));
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;