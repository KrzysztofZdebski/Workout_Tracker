import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Head from "next/head";
import DayContainer from "../components/DayContainer/DayContainer";
import authApi from "../utils/authApi";

function CalorieTracker() {
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });
    const [foods, setFoods] = useState([]);

    const handleAddFood = (food) => {
        setFoods(prev => [...prev, food]);
    };

    const getFoodsForDate = (date) => {
        authApi.get(`/calorie_counter/get_products?date=${date}`)
            .then(response => {
                setFoods(response.data);
                console.log(foods);
            })
            .catch(error => {
                console.error("Error fetching foods:", error);
            });
    }

    useEffect(() => {
        getFoodsForDate(selectedDate);
    }, [selectedDate]);

    return (
        <div className={`relative min-h-screen`}>
            <Head>
                <title>WorkoutTracker</title>
            </Head>
            <div className="gradient-circle"></div>
            <div className="gradient-circle-bottom"></div>
            <div className="container mx-auto mb-10">
                <Header />
                {/* <h1 className="mt-10 text-3xl font-bold text-center">Calorie Tracker</h1> */}
                <div className="pt-10">
                <DayContainer
                    foods={foods}
                    onAddFood={handleAddFood}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                />
                </div>
            </div>
        </div>
    );
}

export default CalorieTracker;