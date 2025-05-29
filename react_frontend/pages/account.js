import React, { useState } from 'react';
import Logout from '../components/Logout';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Head from 'next/head';
import Loading from '../components/Loading';
import ProtectedRoute from '../utils/protectedRoute'; 

function Account() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    return (
        <ProtectedRoute>
        <div className={`relative min-h-screen`}>
            <Head>
                <title>WorkoutTracker</title>
            </Head>
            <div className="gradient-circle"></div>
            <div className="gradient-circle-bottom"></div>
            <div className="container mx-auto mb-10">
            <Header />
                <h1 className="mt-10 text-3xl font-bold text-center">Account Page</h1>
                <p className="mt-4 text-center">This feature is under development.</p>
            </div>
            <div className="flex items-center justify-center mt-10">
                {loading ? (
                    <Loading/>
                ) : (
                    <Logout onLoading={setLoading} />
                )}
            </div>
        </div>
        </ProtectedRoute>
    );
}

export default Account;