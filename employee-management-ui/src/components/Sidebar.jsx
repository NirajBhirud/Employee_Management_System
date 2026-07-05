import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserPlus } from "lucide-react";

export default function Sidebar() {

    const menuClass = ({ isActive }) =>
        `flex items-center gap-3 px-5 py-3 rounded-lg transition ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-slate-700 hover:text-white"
        }`;

    return (

        <aside className="w-64 bg-slate-800 text-white flex flex-col">

            <div className="text-center text-2xl font-bold py-6 border-b border-slate-700">

                EMS

            </div>

            <nav className="flex-1 p-4 space-y-2">

                <NavLink to="/" className={menuClass} end>

                    <LayoutDashboard size={20} />

                    Dashboard

                </NavLink>

                <NavLink to="/employees" className={menuClass}>

                    <Users size={20} />

                    Employees

                </NavLink>

                <NavLink to="/add" className={menuClass}>

                    <UserPlus size={20} />

                    Add Employee

                </NavLink>

            </nav>

        </aside>

    );

}