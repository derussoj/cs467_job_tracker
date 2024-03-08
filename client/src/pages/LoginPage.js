import React from 'react';
import LoginButtons from '../components/auth/LoginButtons';

function LoginPage({ backendUrl }) {
    return (
        <div>
            <h2>Login Page</h2>
            <LoginButtons backendUrl={backendUrl} />
        </div>
    );
}

export default LoginPage;
