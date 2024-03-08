import React from 'react';
import { Button } from 'react-bootstrap';

const LoginButtons = ({ backendUrl }) => {
    return (
        <>
            <Button variant="primary" href={`${backendUrl}/auth/github`}>Log in with GitHub</Button>{' '}
            <Button variant="primary" href={`${backendUrl}/auth/google`}>Log in with Google</Button>
        </>
    );
};

export default LoginButtons;
