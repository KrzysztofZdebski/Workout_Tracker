import React from "react";
import axios from "axios";
import { useState } from "react";

function CalorieCounter() {
    const [TestVar, setTest] = useState("");
    

    function setTestVar(){
        axios.get("http://localhost:5000/calorie_counter/test", {
            withCredentials: true
        })
        .then(response => {
            console.log(response.data); // Log the response to see its structure
            setTest(response.data.data.message); // Assuming the response has a 'message' field
        })
        .catch(error => {
            setTest("Not authenticated");
        });
    }

    return (
        <div className="calorie-counter">
            <h1>Calorie Counter</h1>
            <p>Track your calories and manage your diet!</p>
            <button onClick={setTestVar}>Test</button>
            <p>{TestVar}</p>
        </div>
    );
}

export default CalorieCounter;