import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loader from "../components/common/Loader";
import { getEmployee } from "../services/employeeService";

export default function ViewEmployee() {
    const { id } = useParams();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEmployee();
    }, []);

    async function loadEmployee() {
        try {
            const response = await getEmployee(id);
            setEmployee(response.data);
        } catch (error) {
            console.error(error);
            alert("Unable to load employee.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loader />;
    }

    if (!employee) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-10 text-center">
                Employee not found.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-10">

                {/* Header */}
                <div className="flex items-center gap-6 border-b pb-8">

                    <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                        {employee.firstname?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold">
                            {employee.firstname} {employee.lastname}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Employee ID : {employee.id}
                        </p>
                    </div>

                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">

                    <Detail
                        label="First Name"
                        value={employee.firstname}
                    />

                    <Detail
                        label="Last Name"
                        value={employee.lastname}
                    />

                    <Detail
                        label="Email"
                        value={employee.email}
                    />

                    <Detail
                        label="Phone"
                        value={employee.phone}
                    />

                    <Detail
                        label="Department"
                        value={employee.department}
                    />

                    <Detail
                        label="Designation"
                        value={employee.designation}
                    />

                    <Detail
                        label="Salary"
                        value={
                            employee.salary
                                ? `₹ ${Number(employee.salary).toLocaleString()}`
                                : "-"
                        }
                    />

                    <Detail
                        label="Joining Date"
                        value={employee.joiningDate}
                    />

                    <Detail
                        label="Status"
                        value={
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    employee.status === "Active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {employee.status}
                            </span>
                        }
                    />

                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-12">

                    <Link
                        to={`/edit/${employee.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                    >
                        Edit Employee
                    </Link>

                    <Link
                        to="/employees"
                        className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg transition"
                    >
                        Back
                    </Link>

                </div>

            </div>
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div>
            <p className="text-gray-500 text-sm mb-2">
                {label}
            </p>

            <div className="text-lg font-semibold break-words">
                {value || "-"}
            </div>
        </div>
    );
}