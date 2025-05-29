import React, { useState } from "react";
import { useTheme } from "next-themes";
import Button from "../Button";
import AddFoodModal from "./AddFoodModal";

const DayContainer = ({ foods, onAddFood, selectedDate, onDateChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { theme } = useTheme();

    const handleAddFood = (food) => {
        onAddFood({ ...food, date: selectedDate });
    };

    return (
        <div className={`flex flex-col items-center w-full p-8 ${theme === "dark" ? "bg-black/70" : "bg-white/70"} shadow-lg rounded-2xl`}>
            <div className="flex flex-row items-center justify-between w-full mb-4">
                <div className="flex justify-center flex-1">
                    <label className="flex items-center mb-0 font-semibold">Choose Date:
                        <input
                            type="date"
                            className="px-2 py-1 ml-2 border rounded"
                            value={selectedDate}
                            onChange={e => onDateChange(e.target.value)}
                        />
                    </label>
                </div>
                <div className="flex justify-end">
                    <Button type="button" onClick={() => setIsModalOpen(true)}>Add</Button>
                </div>
            </div>
            <AddFoodModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddFood}
            />
            <div className="w-full">
                <h2 className="mb-2 text-xl font-bold">Foods for {selectedDate}</h2>
                {foods.length === 0 ? (
                    <p className="text-gray-500">No food added for this day.</p>
                ) : (
                    <ul className="divide-y">
                        {/* {foods.map((food, idx) => (
                            <li key={idx} className="flex justify-between py-2">
                                <span>{food.name}</span>
                                <span className="text-gray-600">{food.calories} kcal</span>
                            </li>
                        ))} */}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DayContainer;
