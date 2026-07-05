import React from "react";
import DepartmentRow from "./DepartmentRow";

const DepartmentTable = ({
    departments,
    onEdit,
    onDelete,
}) => {

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">

            <table className="min-w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-6 py-3 text-left">ID</th>

                        <th className="px-6 py-3 text-left">
                            Department Name
                        </th>

                        <th className="px-6 py-3 text-left">
                            Department Code
                        </th>

                        <th className="px-6 py-3 text-left">
                            Description
                        </th>

                        <th className="px-6 py-3 text-left">
                            Status
                        </th>

                        <th className="px-6 py-3 text-center">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {departments.length > 0 ? (

                        departments.map((department) => (

                            <DepartmentRow
                                key={department.id}
                                department={department}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center py-8 text-gray-500"
                            >
                                No Departments Found
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );

};

export default DepartmentTable;