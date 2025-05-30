import React, { use, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Button from "../Button";
import AddFoodModal from "./AddFoodModal";
import Loading from "../Loading";

const DayContainer = ({ foods, onAddFood, selectedDate, onDateChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { theme } = useTheme();

    const handleAddFood = (food) => {
        onAddFood({ ...food, date: selectedDate });
    };

    useEffect(() => {
        setIsLoading(true);
    }, [selectedDate]);

    useEffect(() => {
        setIsLoading(false);
    }, [foods]);

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
                {isLoading ? (
                    <div className="flex items-center justify-center py-8"><Loading /></div>
                ) : foods.length === 0 ? (
                    <p className="text-gray-500">No food added for this day.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left border border-gray-200 rounded-lg">
                            <thead className={`${theme === "dark" ? "bg-neutral-800" : "bg-gray-100"}`}>
                                <tr>
                                    <th className="px-4 py-2 font-semibold">Name</th>
                                    <th className="px-4 py-2 font-semibold">Calories</th>
                                    <th className="px-4 py-2 font-semibold">Protein</th>
                                    <th className="px-4 py-2 font-semibold">Carbs</th>
                                    <th className="px-4 py-2 font-semibold">Fat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foods.map((food, idx) => (
                                    <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-2">{food.name}</td>
                                        <td className="px-4 py-2">{food.calories} kcal</td>
                                        <td className="px-4 py-2">{food.protein ?? 0} g</td>
                                        <td className="px-4 py-2">{food.carbohydrates ?? 0} g</td>
                                        <td className="px-4 py-2">{food.fat ?? 0} g</td>
                                    </tr>
                                ))}
                                {/* Sum row */}
                                <tr className={`${theme === "dark" ? "bg-neutral-600" : "bg-gray-100"}`}>
                                    <td className="px-4 py-2">Total</td>
                                    <td className="px-4 py-2">
                                        {foods.reduce((sum, f) => sum + (Number(f.calories) || 0), 0)} kcal
                                    </td>
                                    <td className="px-4 py-2">
                                        {foods.reduce((sum, f) => sum + (Number(f.protein) || 0), 0)} g
                                    </td>
                                    <td className="px-4 py-2">
                                        {foods.reduce((sum, f) => sum + (Number(f.carbohydrates) || 0), 0)} g
                                    </td>
                                    <td className="px-4 py-2">
                                        {foods.reduce((sum, f) => sum + (Number(f.fat) || 0), 0)} g
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DayContainer;
