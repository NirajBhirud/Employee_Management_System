import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmployeeForm from "../components/employee/EmployeeForm";
import Loader from "../components/common/Loader";

import {
    getEmployee,
    updateEmployee
} from "../services/employeeService";

export default function EditEmployee() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        loadEmployee();
    }, []);

    async function loadEmployee() {
        try {
            const response = await getEmployee(id);
            setEmployee(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleUpdate(updatedEmployee) {
        try {
            await updateEmployee(id, updatedEmployee);
            navigate("/employees");
        } catch (error) {
            console.error(error);
            alert("Unable to update employee.");
        }
    }

    if (!employee) {
        return <Loader />;
    }

    return (
        <div>

            <h1 className="text-4xl font-bold mb-8">
                Edit Employee
            </h1>

            <EmployeeForm
                initialData={employee}
                onSubmit={handleUpdate}
                buttonText="Update Employee"
            />

        </div>
    );
}