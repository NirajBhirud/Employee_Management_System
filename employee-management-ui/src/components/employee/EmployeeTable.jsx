import EmployeeRow from "./EmployeeRow";

export default function EmployeeTable({
    employees,
    onDelete
}) {

    if (employees.length === 0) {

        return (

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">

                No Employees Found

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="px-6 py-4 text-left">ID</th>
                        <th className="text-left">First Name</th>
<th className="text-left">Name</th>
<th className="text-left">Email</th>
<th className="text-left">Status</th>
                        <th className="text-center">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {employees.map(employee => (

                        <EmployeeRow
                            key={employee.id}
                            employee={employee}
                            onDelete={onDelete}
                        />

                    ))}

                </tbody>

            </table>

        </div>

    );

}