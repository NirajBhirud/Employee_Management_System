import { useEffect, useState } from "react";

import Input from "../common/Input";
import Button from "../common/Button";

import { getAllDepartments } from "../../services/DepartmentService";

const EMPTY_EMPLOYEE = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
    status: "Active"
};

export default function EmployeeForm({
    initialData,
    onSubmit,
    buttonText
}) {

    const [employee, setEmployee] = useState(EMPTY_EMPLOYEE);

    const [departments, setDepartments] = useState([]);

    const [loadingDepartments, setLoadingDepartments] = useState(true);

    useEffect(() => {

        if (initialData) {
            setEmployee(initialData);
        }

    }, [initialData]);

    useEffect(() => {

        loadDepartments();

    }, []);

    async function loadDepartments() {

        try {

            const response = await getAllDepartments();

            setDepartments(response.data);

        } catch (error) {

            console.error("Unable to load departments.", error);

        } finally {

            setLoadingDepartments(false);

        }

    }

    function handleChange(e) {

        const { name, value } = e.target;

        setEmployee(prev => ({
            ...prev,
            [name]: value
        }));

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit(employee);

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-xl p-8"
        >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Input
                    label="First Name"
                    name="firstname"
                    value={employee.firstname}
                    onChange={handleChange}
                    required
                    placeholder="Enter first name"
                />

                <Input
                    label="Last Name"
                    name="lastname"
                    value={employee.lastname}
                    onChange={handleChange}
                    placeholder="Enter last name"
                />

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email"
                />

                <Input
                    label="Phone"
                    name="phone"
                    value={employee.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                />

                <div>

                    <label className="block mb-2 text-sm font-medium text-gray-700">

                        Department

                    </label>

                    <select
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="">

                            Select Department

                        </option>

                        {

                            !loadingDepartments &&

                            departments.map((department) => (

                                <option
                                    key={department.id}
                                    value={department.departmentCode}
                                >

                                    {department.departmentName}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <Input
                    label="Designation"
                    name="designation"
                    value={employee.designation}
                    onChange={handleChange}
                    placeholder="Enter designation"
                />

                <Input
                    label="Salary"
                    type="number"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    placeholder="Enter salary"
                />

                <Input
                    label="Joining Date"
                    type="date"
                    name="joiningDate"
                    value={employee.joiningDate}
                    onChange={handleChange}
                />
                                <div>

                                    <label className="block mb-2 text-sm font-medium text-gray-700">

                                        Status

                                    </label>

                                    <select
                                        name="status"
                                        value={employee.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >

                                        <option value="Active">

                                            Active

                                        </option>

                                        <option value="Inactive">

                                            Inactive

                                        </option>

                                    </select>

                                </div>

                            </div>

                            <div className="flex justify-end mt-8">

                                <Button
                                    type="submit"
                                    variant="primary"
                                >

                                    {buttonText}

                                </Button>

                            </div>

                        </form>

                    );

                }