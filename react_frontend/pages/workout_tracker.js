import React from "react";
import Header from "../components/Header";
import Head from "next/head";

function WorkoutTracker() {
    return (
        <div className={`relative min-h-screen`}>
            <Head>
                <title>WorkoutTracker</title>
            </Head>
            <div className="gradient-circle"></div>
            <div className="gradient-circle-bottom"></div>
            <div className="container mx-auto mb-10">
            <Header />
                <h1 className="mt-10 text-3xl font-bold text-center">Workout Tracker</h1>
                <p className="mt-4 text-center">This feature is under development.</p>
            </div>
        </div>
    );
}

export default WorkoutTracker;