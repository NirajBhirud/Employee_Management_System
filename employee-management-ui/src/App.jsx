import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import DepartmentPage from "./pages/DepartmentPage";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import ManageUsers from "./pages/ManageUsers";
import MyAttendance from "./pages/MyAttendance";
import MyPayslips from "./pages/MyPayslips";
import RequestLeave from "./pages/RequestLeave";
import LeaveApprovals from "./pages/LeaveApprovals";
import NotFound from "./pages/NotFound";

export default function App() {

    return (

        <Routes>

            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>

                <Route element={<MainLayout />}>

                    <Route path="/" element={<Dashboard />} />

                    <Route element={<ProtectedRoute allowedRoles={["ADMIN", "HR"]} />}>

                        <Route path="/employees" element={<Employees />} />

                        <Route path="/departments" element={<DepartmentPage />} />

                        <Route path="/attendance" element={<Attendance />} />

                        <Route path="/payroll" element={<Payroll />} />

                        <Route path="/add" element={<AddEmployee />} />

                        <Route path="/edit/:id" element={<EditEmployee />} />

                        <Route path="/employee/:id" element={<EmployeeDetails />} />

                        <Route path="/leave-approvals" element={<LeaveApprovals />} />

                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>

                        <Route path="/users" element={<ManageUsers />} />

                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["EMPLOYEE"]} />}>

                        <Route path="/my-attendance" element={<MyAttendance />} />

                        <Route path="/my-payslips" element={<MyPayslips />} />

                        <Route path="/request-leave" element={<RequestLeave />} />

                    </Route>

                </Route>

            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>

    );

}