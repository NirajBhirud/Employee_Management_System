import { useEffect, useState } from "react";
import {
    createDepartment,
    updateDepartment,
} from "../../services/DepartmentService";

const DepartmentForm = ({
    selectedDepartment,
    onSuccess,
    onCancel,
}) => {

    const [department, setDepartment] = useState({
        departmentName: "",
        departmentCode: "",
        description: "",
        status: "ACTIVE",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (selectedDepartment) {
            setDepartment(selectedDepartment);
        }

    }, [selectedDepartment]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setDepartment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            if (selectedDepartment) {

                await updateDepartment(
                    selectedDepartment.id,
                    department
                );

            } else {

                await createDepartment(department);

            }

            onSuccess();

        } catch (error) {

            console.error("Error saving department", error);
            alert("Unable to save department.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white shadow-lg rounded-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

                {selectedDepartment
                    ? "Update Department"
                    : "Add Department"}

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <div>

                    <label className="block mb-2 font-medium">
                        Department Name
                    </label>

                    <input
                        type="text"
                        name="departmentName"
                        value={department.departmentName}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">
                        Department Code
                    </label>

                    <input
                        type="text"
                        name="departmentCode"
                        value={department.departmentCode}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">
                        Description
                    </label>

                    <textarea
                        name="description"
                        rows="3"
                        value={department.description}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">
                        Status
                    </label>

                    <select
                        name="status"
                        value={department.status}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >

                        <option value="ACTIVE">
                            ACTIVE
                        </option>

                        <option value="INACTIVE">
                            INACTIVE
                        </option>

                    </select>

                </div>

                <div className="flex justify-end gap-3 pt-4">

                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >

                        {loading
                            ? "Saving..."
                            : selectedDepartment
                                ? "Update"
                                : "Save"}

                    </button>

                </div>

            </form>

        </div>

    );
};

export default DepartmentForm;