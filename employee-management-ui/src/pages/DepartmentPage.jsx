import { useEffect, useState } from "react";

import {
    getAllDepartments,
    deleteDepartment,
} from "../services/DepartmentService";

import Loader from "../components/common/Loader";
import Modal from "../components/common/Modal";
import FormModal from "../components/common/FormModal";

import DepartmentForm from "../components/department/DepartmentForm";
import DepartmentTable from "../components/department/DepartmentTable";

const DepartmentPage = () => {

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departmentIdToDelete, setDepartmentIdToDelete] = useState(null);

    const loadDepartments = async () => {

        try {

            setLoading(true);

            const response = await getAllDepartments();

            setDepartments(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        loadDepartments();
    }, []);

    const handleAdd = () => {

        setSelectedDepartment(null);
        setShowFormModal(true);

    };

    const handleEdit = (department) => {

        setSelectedDepartment(department);
        setShowFormModal(true);

    };

    const handleDeleteClick = (id) => {

        setDepartmentIdToDelete(id);
        setShowDeleteModal(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteDepartment(departmentIdToDelete);

            loadDepartments();

        } catch (error) {

            console.error(error);

        }

        setShowDeleteModal(false);
        setDepartmentIdToDelete(null);

    };

    const handleSuccess = () => {

        setShowFormModal(false);
        setSelectedDepartment(null);

        loadDepartments();

    };

    if (loading) {

        return <Loader />;

    }

    return (

        <div className="p-6">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">

                    Department Management

                </h1>

                <button
                    onClick={handleAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                    Add Department
                </button>

            </div>

            <DepartmentTable
                departments={departments}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <FormModal
                isOpen={showFormModal}
                title={
                    selectedDepartment
                        ? "Update Department"
                        : "Add Department"
                }
                onClose={() => setShowFormModal(false)}
            >

                <DepartmentForm
                    selectedDepartment={selectedDepartment}
                    onSuccess={handleSuccess}
                    onCancel={() => setShowFormModal(false)}
                />

            </FormModal>

            <Modal
                isOpen={showDeleteModal}
                title="Delete Department"
                message="Are you sure you want to delete this department?"
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />

        </div>

    );

};

export default DepartmentPage;