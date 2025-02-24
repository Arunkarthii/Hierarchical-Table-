import React, { useState, useRef } from "react";
import { calculateParentValue } from "../util";

const TableRow = ({ row, onUpdate, index }) => {
    const [inputValue, setInputValue] = useState("");
    const originalValueRef = useRef(row.value || calculateParentValue(row.children || []));
    const originalValue = originalValueRef.current;

    const handlePercentage = () => {
        const percentage = parseFloat(inputValue);
        if (!isNaN(percentage)) {
            const newValue = (row.value || 0) * (1 + percentage / 100);
            onUpdate(row.id, newValue);
        }
    };

    const handleValueUpdate = () => {
        const newValue = parseFloat(inputValue);
        if (!isNaN(newValue)) {
            onUpdate(row.id, newValue);
        }
    };

    const variance = originalValue ? ((row.value - originalValue) / originalValue) * 100 : 0;

    return (
        <>
            <tr
                key={row.id}
                className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition-all`}
            >
                <td className="py-3 px-4">
                    {row.children ? (
                        <span className="font-bold text-lg text-gray-800">{row.label}</span> // Parent Label
                    ) : (
                        <span className="pl-6 text-gray-600">-- {row.label}</span> // Leaf Label with Indent
                    )}
                </td>
                <td className="py-3 px-4 text-center">{row.value.toFixed(2)}</td>
                <td className="py-3 px-4 text-center">
                    <input
                        type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                        className="w-full border px-2 py-1 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter %"
                    />
                </td>
                <td className="py-3 px-4 text-center">
                    <button onClick={handlePercentage} className="btn-primary">Allocate %</button>
                </td>
                <td className="py-3 px-4 text-center">
                    <button onClick={handleValueUpdate} className="btn-secondary">Allocate Val</button>
                </td>
                <td className="py-3 px-4 text-center text-blue-600 font-semibold">{variance.toFixed(2)}%</td>
            </tr>
            {row.children &&
                row.children.map((child) => <TableRow key={child.id} row={child} onUpdate={onUpdate} />)}
        </>
    );
};

export default TableRow;
