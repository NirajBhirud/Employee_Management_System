import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../components/employee/SearchBar";
import EmployeeTable from "../components/employee/EmployeeTable";
import Loader from "../components/common/Loader";
import Modal from "../components/common/Modal";

import {
    getEmployees,
    deleteEmployee,
} from "../services/employeeService";

import { getAllDepartments } from "../services/departmentService";

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        setLoading(true);

        try {
            const [employeeResponse, departmentResponse] = await Promise.all([
                getEmployees(),
                getAllDepartments(),
            ]);

            setEmployees(employeeResponse.data || []);
            setDepartments(departmentResponse.data || []);
        } catch (error) {
            console.error(error);
            alert("Failed to load data.");
        } finally {
            setLoading(false);
        }
    }

    function handleDelete(id) {
        setSelectedEmployee(id);
        setShowModal(true);
    }

    async function confirmDelete() {
        try {
            await deleteEmployee(selectedEmployee);

            setEmployees((prev) =>
                prev.filter((employee) => employee.id !== selectedEmployee)
            );

            setShowModal(false);
            setSelectedEmployee(null);
        } catch (error) {
            console.error(error);
            alert("Unable to delete employee.");
        }
    }

    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => {
            const keyword = search.toLowerCase();

            const matchesSearch =
                employee.firstname?.toLowerCase().includes(keyword) ||
                employee.lastname?.toLowerCase().includes(keyword) ||
                employee.email?.toLowerCase().includes(keyword) ||
                employee.phone?.toLowerCase().includes(keyword) ||
                employee.designation?.toLowerCase().includes(keyword) ||
                employee.department?.toLowerCase().includes(keyword);

            const matchesDepartment =
                selectedDepartment === "" ||
                employee.department === selectedDepartment;

            return matchesSearch && matchesDepartment;
        });
    }, [employees, search, selectedDepartment]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <h1 className="text-4xl font-bold text-slate-800">
                    Employees
                </h1>

                <div className="flex flex-col md:flex-row gap-3">
                    <SearchBar value={search} onChange={setSearch} />

                    <select
                        value={selectedDepartment}
                        onChange={(e) =>
                            setSelectedDepartment(e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Departments</option>

                        {departments.map((department) => (
                            <option
                                key={department.id}
                                value={department.departmentName}
                            >
                                {department.departmentName}
                            </option>
                        ))}
                    </select>

                    <Link
                        to="/add"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
                    >
                        Add Employee
                    </Link>
                </div>
            </div>

            {!loading && (
                <div className="flex items-center justify-between bg-white rounded-xl shadow p-4">
                    <div className="text-gray-700">
                        Total Employees:{" "}
                        <span className="font-semibold">
                            {filteredEmployees.length}
                        </span>
                    </div>

                    {selectedDepartment && (
                        <button
                            onClick={() => setSelectedDepartment("")}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Clear Department Filter
                        </button>
                    )}
                </div>
            )}

            {loading ? (
                <Loader />
            ) : (
                <EmployeeTable
                    employees={filteredEmployees}
                    onDelete={handleDelete}
                />
            )}

            <Modal
                isOpen={showModal}
                title="Delete Employee"
                message="Are you sure you want to delete this employee?"
                onClose={() => {
                    setShowModal(false);
                    setSelectedEmployee(null);
                }}
                onConfirm={confirmDelete}
            />
        </div>
    );
}