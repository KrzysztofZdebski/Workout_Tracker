import React, { useState } from "react";
import Button from "../Button";
import { useTheme } from "next-themes";

const AddFoodModal = ({ isOpen, onClose, onAdd }) => {
    const [foodName, setFoodName] = useState("");
    const [calories, setCalories] = useState("");
    const { theme } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!foodName || !calories) return;
        onAdd({ name: foodName, calories: Number(calories) });
        setFoodName("");
        setCalories("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`w-full max-w-sm p-8 rounded-lg shadow-lg ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                <h2 className="mb-4 text-xl font-bold">Add Food</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Food name"
                        className="px-4 py-2 border rounded"
                        value={foodName}
                        onChange={e => setFoodName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Calories"
                        className="px-4 py-2 border rounded"
                        value={calories}
                        onChange={e => setCalories(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <Button type="button" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFoodModal;
