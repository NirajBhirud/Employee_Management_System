import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmployeeRow({
    employee,
    onDelete
}) {

    return (

        <tr className="border-b hover:bg-slate-50">

            <td className="px-6 py-4">
                {employee.id}
            </td>

            <td>{employee.firstname}</td>

            <td>{employee.lastname}</td>

            <td>{employee.email}</td>

            <td>

                <div className="flex justify-center gap-4">

                    <Link to={`/employee/${employee.id}`}>
                        <Eye
                            size={20}
                            className="text-green-600 hover:scale-110 transition"
                        />
                    </Link>

                    <Link to={`/edit/${employee.id}`}>
                        <Pencil
                            size={20}
                            className="text-blue-600 hover:scale-110 transition"
                        />
                    </Link>

                    <button
                        onClick={() => onDelete(employee.id)}
                    >
                        <Trash2
                            size={20}
                            className="text-red-600 hover:scale-110 transition"
                        />
                    </button>

                </div>

            </td>

        </tr>

    );

}