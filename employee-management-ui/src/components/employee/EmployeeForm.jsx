import { useEffect, useState } from "react";

const EMPTY_EMPLOYEE = {
    firstname: "",
    lastname: "",
    email: ""
};

export default function EmployeeForm({
    initialData,
    onSubmit,
    buttonText
}) {

    const [employee, setEmployee] = useState(EMPTY_EMPLOYEE);

    useEffect(() => {
        if (initialData) {
            setEmployee(initialData);
        } else {
            setEmployee(EMPTY_EMPLOYEE);
        }
    }, [initialData]);

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
            className="bg-white shadow-lg rounded-xl p-8 max-w-2xl"
        >

            <div className="mb-5">
                <label className="block mb-2 font-semibold">
                    First Name
                </label>

                <input
                    type="text"
                    name="firstname"
                    value={employee.firstname}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    required
                />
            </div>

            <div className="mb-5">
                <label className="block mb-2 font-semibold">
                    Last Name
                </label>

                <input
                    type="text"
                    name="lastname"
                    value={employee.lastname}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    required
                />
            </div>

            <div className="mb-8">
                <label className="block mb-2 font-semibold">
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
                {buttonText}
            </button>

        </form>
    );
}