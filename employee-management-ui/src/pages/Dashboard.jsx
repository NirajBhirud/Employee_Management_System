import { useEffect, useState } from "react";
import DashboardCard from "../components/dashboard/DashboardCard";
import { Users, Building2, UserCheck } from "lucide-react";
import { getEmployees } from "../services/employeeService";
import { getAllDepartments } from "../services/departmentService";

export default function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        Promise.all([getEmployees(), getAllDepartments()])
            .then(([empRes, deptRes]) => {
                setEmployees(empRes.data || []);
                setDepartments(deptRes.data || []);
            })
            .catch(console.error);
    }, []);

    const activeCount = employees.filter(e => e.status === "Active").length;

    return (
        <div>
            <h1 className="text-2xl font-semibold text-navy mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="Total Employees"
                    value={employees.length}
                    icon={<Users size={24} className="text-teal" />}
                    color="bg-teal-light"
                />
                <DashboardCard
                    title="Departments"
                    value={departments.length}
                    icon={<Building2 size={24} className="text-teal" />}
                    color="bg-teal-light"
                />
                <DashboardCard
                    title="Active Employees"
                    value={activeCount}
                    icon={<UserCheck size={24} className="text-teal" />}
                    color="bg-teal-light"
                />
            </div>
        </div>
    );
}