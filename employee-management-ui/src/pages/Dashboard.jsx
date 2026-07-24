import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Building2, UserCheck, ClipboardList, Receipt } from "lucide-react";

import DashboardCard from "../components/dashboard/DashboardCard";
import { useAuth } from "../context/AuthContext";
import { getEmployees } from "../services/employeeService";
import { getAllDepartments } from "../services/departmentService";
import { getAttendanceByEmployee } from "../services/attendanceService";
import { getPayslipsForEmployee } from "../services/payrollService";

function todayIso() {
    return new Date().toISOString().split("T")[0];
}

function StaffDashboard() {
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
    );
}

function EmployeeDashboard({ employeeId }) {
    const [todayStatus, setTodayStatus] = useState("Not Marked");
    const [latestPayslip, setLatestPayslip] = useState(null);

    useEffect(() => {
        if (!employeeId) return;

        const today = todayIso();

        getAttendanceByEmployee(employeeId, today, today)
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setTodayStatus(res.data[0].status);
                }
            })
            .catch(console.error);

        getPayslipsForEmployee(employeeId)
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setLatestPayslip(res.data[0]);
                }
            })
            .catch(console.error);
    }, [employeeId]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/my-attendance" className="block">
                <DashboardCard
                    title="Today's Attendance"
                    value={todayStatus}
                    icon={<ClipboardList size={24} className="text-teal" />}
                    color="bg-teal-light"
                />
            </Link>
            <Link to="/my-payslips" className="block">
                <DashboardCard
                    title="Latest Net Pay"
                    value={latestPayslip ? `₹${latestPayslip.netPay}` : "No payslips yet"}
                    icon={<Receipt size={24} className="text-teal" />}
                    color="bg-teal-light"
                />
            </Link>
        </div>
    );
}

export default function Dashboard() {
    const { auth } = useAuth();
    const isStaff = auth?.role === "ADMIN" || auth?.role === "HR";

    return (
        <div>
            <h1 className="text-2xl font-semibold text-navy mb-1">Dashboard</h1>
            <p className="text-text-muted mb-6">Welcome back, {auth?.username}</p>

            {isStaff ? <StaffDashboard /> : <EmployeeDashboard employeeId={auth?.employeeId} />}
        </div>
    );
}