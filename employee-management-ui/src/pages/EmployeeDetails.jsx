import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/common/Loader";
import { getEmployee } from "../services/employeeService";

export default function EmployeeDetails() {

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

    if (!employee) {

        return <Loader />;

    }

    return (

        <div className="max-w-4xl mx-auto">

            <div className="bg-white rounded-xl shadow-lg p-10">

                <div className="flex items-center gap-6 mb-10">

                    <div
                        className="w-24 h-24 rounded-full bg-blue-600 text-white flex justify-center items-center text-4xl font-bold"
                    >
                        {employee.firstname.charAt(0).toUpperCase()}
                    </div>

                    <div>

                        <h1 className="text-3xl font-bold">

                            {employee.firstname} {employee.lastname}

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Employee ID : {employee.id}

                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-8">

                    <div>

                        <h3 className="font-semibold text-gray-600">

                            First Name

                        </h3>

                        <p className="text-lg">

                            {employee.firstname}

                        </p>

                    </div>

                    <div>

                        <h3 className="font-semibold text-gray-600">

                            Last Name

                        </h3>

                        <p className="text-lg">

                            {employee.lastname}

                        </p>

                    </div>

                    <div>

                        <h3 className="font-semibold text-gray-600">

                            Email

                        </h3>

                        <p className="text-lg">

                            {employee.email}

                        </p>

                    </div>

                </div>

                <div className="mt-10 flex gap-4">

                    <button

                        onClick={() => navigate(`/edit/${employee.id}`)}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"

                    >

                        Edit Employee

                    </button>

                    <button

                        onClick={() => navigate("/employees")}

                        className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg"

                    >

                        Back

                    </button>

                </div>

            </div>

        </div>

    );

}