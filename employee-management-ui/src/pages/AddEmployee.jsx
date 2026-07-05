import { useNavigate } from "react-router-dom";

import EmployeeForm from "../components/employee/EmployeeForm";

import { createEmployee } from "../services/employeeService";

export default function AddEmployee() {

    const navigate = useNavigate();

    async function handleAdd(employee) {

        try {

            await createEmployee(employee);

            navigate("/employees");

        } catch (error) {

            console.error(error);

            alert("Unable to save employee.");

        }

    }

    return (

        <div>

            <h1 className="text-4xl font-bold mb-8">

                Add Employee

            </h1>

            <EmployeeForm

                onSubmit={handleAdd}

                buttonText="Save Employee"

            />

        </div>

    );

}