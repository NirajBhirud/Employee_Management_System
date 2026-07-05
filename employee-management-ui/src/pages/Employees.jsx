import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../components/employee/SearchBar";
import EmployeeTable from "../components/employee/EmployeeTable";
import Loader from "../components/common/Loader";
import Modal from "../components/common/Modal";

import {
    getEmployees,
    deleteEmployee
} from "../services/employeeService";

export default function Employees() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        loadEmployees();
    }, []);

    async function loadEmployees() {

        try {

            const response = await getEmployees();

            setEmployees(response.data);

        } catch (error) {

            console.error(error);

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

            setShowModal(false);

            loadEmployees();

        } catch (error) {

            console.error(error);

            alert("Unable to delete employee.");

        }

    }

    const filteredEmployees = employees.filter(employee =>

        employee.firstname.toLowerCase().includes(search.toLowerCase()) ||

        employee.lastname.toLowerCase().includes(search.toLowerCase()) ||

        employee.email.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-4xl font-bold">

                    Employees

                </h1>

                <div className="flex gap-3">

                    <SearchBar
                        value={search}
                        onChange={setSearch}
                    />

                    <Link
                        to="/add"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >
                        Add Employee
                    </Link>

                </div>

            </div>

            {

                loading

                    ?

                    <Loader />

                    :

                    <EmployeeTable
                        employees={filteredEmployees}
                        onDelete={handleDelete}
                    />

            }

            <Modal

                isOpen={showModal}

                title="Delete Employee"

                message="Are you sure you want to delete this employee?"

                onClose={() => setShowModal(false)}

                onConfirm={confirmDelete}

            />

        </div>

    );

}