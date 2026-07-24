import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard, Users, UserPlus, Building2, CalendarCheck,
    Wallet, LogOut, X, ClipboardList, Receipt, ShieldCheck, CalendarClock, CheckSquare
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ open, onClose }) {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    const menuClass = ({ isActive }) =>
        `flex items-center gap-3 px-5 py-3 border-l-4 transition ${
            isActive
                ? "border-teal bg-white/5 text-white font-medium"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
        }`;

    const isStaff = auth?.role === "ADMIN" || auth?.role === "HR";

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <>
            {open && (
                <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy text-white flex flex-col
                    transform transition-transform duration-200
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0 lg:static`}
            >
                <div className="flex items-center justify-between gap-3 px-5 py-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-md bg-teal flex items-center justify-center font-bold text-sm">
                            EM
                        </div>
                        <div>
                            <p className="font-semibold leading-tight">EMS</p>
                            <p className="text-xs text-slate-400">Workforce Portal</p>
                        </div>
                    </div>

                    <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 py-4 space-y-1" onClick={onClose}>
                    <NavLink to="/" className={menuClass} end>
                        <LayoutDashboard size={18} /> Dashboard
                    </NavLink>

                    {isStaff && (
                        <>
                            <NavLink to="/employees" className={menuClass}>
                                <Users size={18} /> Employees
                            </NavLink>
                            <NavLink to="/departments" className={menuClass}>
                                <Building2 size={18} /> Departments
                            </NavLink>
                            <NavLink to="/attendance" className={menuClass}>
                                <CalendarCheck size={18} /> Attendance
                            </NavLink>
                            <NavLink to="/leave-approvals" className={menuClass}>
                                <CheckSquare size={18} /> Leave Approvals
                            </NavLink>
                            <NavLink to="/payroll" className={menuClass}>
                                <Wallet size={18} /> Payroll
                            </NavLink>
                            <NavLink to="/add" className={menuClass}>
                                <UserPlus size={18} /> Add Employee
                            </NavLink>
                        </>
                    )}

                    {auth?.role === "ADMIN" && (
                        <NavLink to="/users" className={menuClass}>
                            <ShieldCheck size={18} /> Manage Users
                        </NavLink>
                    )}

                    {auth?.role === "EMPLOYEE" && (
                        <>
                            <NavLink to="/my-attendance" className={menuClass}>
                                <ClipboardList size={18} /> My Attendance
                            </NavLink>
                            <NavLink to="/request-leave" className={menuClass}>
                                <CalendarClock size={18} /> Request Leave
                            </NavLink>
                            <NavLink to="/my-payslips" className={menuClass}>
                                <Receipt size={18} /> My Payslips
                            </NavLink>
                        </>
                    )}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-5 py-4 border-t border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                >
                    <LogOut size={18} /> Logout
                </button>
            </aside>
        </>
    );
}