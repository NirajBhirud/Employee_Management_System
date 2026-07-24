import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { getPayslipsForEmployee } from "../services/payrollService";
import Loader from "../components/common/Loader";

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function MyPayslips() {
    const { auth } = useAuth();
    const employeeId = auth?.employeeId;

    const [payslips, setPayslips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadData() {
        if (!employeeId) {
            setError("Your account is not linked to an employee record.");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await getPayslipsForEmployee(employeeId);
            setPayslips(res.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load your payslips.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loader />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-navy mb-1">My Payslips</h1>
            <p className="text-text-muted mb-6">Your salary history</p>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            {!error && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-left">Period</th>
                                <th className="text-left">Basic Salary</th>
                                <th className="text-left">Allowances</th>
                                <th className="text-left">Deductions</th>
                                <th className="text-left">Leave Days</th>
                                <th className="text-left">Net Pay</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payslips.map((p) => (
                                <tr key={p.id} className="border-b border-border">
                                    <td className="px-6 py-4">{MONTH_NAMES[p.month - 1]} {p.year}</td>
                                    <td>₹{p.basicSalary}</td>
                                    <td>₹{p.allowances}</td>
                                    <td>₹{p.deductions}</td>
                                    <td>{p.leaveDeductionDays}</td>
                                    <td className="font-medium">₹{p.netPay}</td>
                                </tr>
                            ))}
                            {payslips.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-text-muted">
                                        No payslips yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}