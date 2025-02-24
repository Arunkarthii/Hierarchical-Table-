import React, { useState } from "react";
import TableRow from "./TableRow";

const Table = ({ data }) => {
    const [rows, setRows] = useState(data);

    const updateValue = (id, newValue) => {
        const updateRows = (items, parentOriginalValues = {}) => {
            return items.map((item) => {
                if (item.id === id) {
                    // If updating a parent, calculate contribution % for children
                    if (item.children) {
                        const totalChildValue = item.children.reduce((sum, child) => sum + child.value, 0);

                        const updatedChildren = item.children.map((child) => {
                            const contributionPercentage = totalChildValue ? child.value / totalChildValue : 0;
                            const newChildValue = newValue * contributionPercentage;
                            const variance = ((newChildValue - child.value) / child.value) * 100;

                            return {
                                ...child,
                                value: parseFloat(newChildValue.toFixed(2)), // Rounded to 2 decimal places
                                variance: parseFloat(variance.toFixed(2)), // Rounded to 2 decimal places
                            };
                        });

                        return {
                            ...item,
                            value: newValue,
                            variance: ((newValue - item.originalValue) / item.originalValue) * 100,
                            children: updatedChildren,
                        };
                    }

                    // If updating a leaf node
                    const originalValue = item.originalValue || item.value;
                    return {
                        ...item,
                        value: newValue,
                        variance: ((newValue - originalValue) / originalValue) * 100,
                        originalValue,
                    };
                } else if (item.children) {
                    const updatedChildren = updateRows(item.children, parentOriginalValues);
                    const newParentValue = updatedChildren.reduce((sum, child) => sum + child.value, 0);
                    const originalParentValue = parentOriginalValues[item.id] || item.value;

                    return {
                        ...item,
                        children: updatedChildren,
                        value: newParentValue,
                        variance: ((newParentValue - originalParentValue) / originalParentValue) * 100,
                        originalValue: originalParentValue,
                    };
                }
                return item;
            });
        };

        setRows((prevRows) => updateRows(prevRows));
    };


    const grandTotal = rows.reduce((sum, row) => sum + row.value, 0);

    return (
        <table className="w-full border-collapse rounded-lg shadow-md overflow-hidden">
            <thead>
                <tr className="bg-gray-800 text-white">
                    <th className="py-3 px-4 text-left">Label</th>
                    <th className="py-3 px-4 text-center">Value</th>
                    <th className="py-3 px-4 text-center">Input</th>
                    <th className="py-3 px-4 text-center">Allocation %</th>
                    <th className="py-3 px-4 text-center">Allocation Val</th>
                    <th className="py-3 px-4 text-center">Variance %</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <TableRow key={row.id} row={row} index={index} onUpdate={updateValue} />
                ))}
                <tr className="bg-gray-800 text-white w-f">
                    <td className="py-3 px-4 text-lg font-bold">Grand Total</td>
                    <td className="py-3 px-4 text-lg font-bold">{grandTotal.toFixed(2)}</td>
                    <td colSpan="4"></td>
                </tr>
            </tbody>
        </table>
    );
};

export default Table;
