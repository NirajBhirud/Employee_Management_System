import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmployeeRow({ employee, onDelete }) {
    const isActive = employee.status === "Active";

    return (
        <tr className="border-b border-border hover:bg-slate-50">
            <td className="px-6 py-4 tabular text-text-muted">#{employee.id}</td>
            <td>{employee.firstname} {employee.lastname}</td>
            <td>{employee.email}</td>
            <td>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                }`}>
                    {employee.status || "Unknown"}
                </span>
            </td>
            <td>
                <div className="flex justify-center gap-4">
                    <Link to={`/employee/${employee.id}`}>
                        <Eye size={18} className="text-teal hover:opacity-70 transition" />
                    </Link>
                    <Link to={`/edit/${employee.id}`}>
                        <Pencil size={18} className="text-navy hover:opacity-70 transition" />
                    </Link>
                    <button onClick={() => onDelete(employee.id)}>
                        <Trash2 size={18} className="text-red-600 hover:opacity-70 transition" />
                    </button>
                </div>
            </td>
        </tr>
    );
}