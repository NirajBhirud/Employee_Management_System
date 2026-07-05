import React from "react";

const DepartmentRow = ({ department, onEdit, onDelete }) => {

    return (
        <tr className="border-b hover:bg-gray-50 transition">

            <td className="px-6 py-4">
                {department.id}
            </td>

            <td className="px-6 py-4">
                {department.departmentName}
            </td>

            <td className="px-6 py-4">
                {department.departmentCode}
            </td>

            <td className="px-6 py-4">
                {department.description}
            </td>

            <td className="px-6 py-4">

                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        department.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {department.status}
                </span>

            </td>

            <td className="px-6 py-4 text-center">

                <button
                    onClick={() => onEdit(department)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(department.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                    Delete
                </button>

            </td>

        </tr>
    );

};

export default DepartmentRow;