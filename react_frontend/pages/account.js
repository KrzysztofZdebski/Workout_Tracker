import React from 'react';
import Logout from '../components/Logout';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import Header from '../components/Header';

function Account() {
    const router = useRouter();
    return (
        <div
            className={`container mx-auto mb-10`}
        >
        <Header />
            <h1>Account</h1>
            <p>This is the account page.</p>
            <Logout />
        </div>
    );
}

export default Account;