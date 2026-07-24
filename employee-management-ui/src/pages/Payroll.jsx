import { useEffect, useState } from "react";

import { getEmployees } from "../services/employeeService";
import {
    generatePayslip,
    getPayslipsForMonth,
    updatePayslip,
    deletePayslip
} from "../services/payrollService";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Loader from "../components/common/Loader";
import FormModal from "../components/common/FormModal";

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function Payroll() {
    const now = new Date();

    const [month, setMonth] = useState(now.getMonth() + 1);
    const [year, setYear] = useState(now.getFullYear());
    const [employees, setEmployees] = useState([]);
    const [payslips, setPayslips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [generatingId, setGeneratingId] = useState(null);
    const [error, setError] = useState("");

    const [selectedPayslip, setSelectedPayslip] = useState(null);
    const [editValues, setEditValues] = useState({ allowances: 0, deductions: 0 });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month, year]);

    async function loadData() {
        setLoading(true);
        setError("");
        try {
            const [employeesRes, payslipsRes] = await Promise.all([
                getEmployees(),
                getPayslipsForMonth(month, year)
            ]);
            setEmployees(employeesRes.data);
            setPayslips(payslipsRes.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load payroll data.");
        } finally {
            setLoading(false);
        }
    }

    function payslipFor(employeeId) {
        return payslips.find((p) => p.employeeId === employeeId);
    }

    async function handleGenerate(employeeId) {
        setGeneratingId(employeeId);
        try {
            await generatePayslip({ employeeId, month, year, allowances: 0, deductions: 0 });
            await loadData();
        } catch (err) {
            alert(err.response?.data?.message || "Payslip generation failed.");
        } finally {
            setGeneratingId(null);
        }
    }

    async function handleDelete(payslipId) {
        if (!window.confirm("Delete this payslip?")) return;
        try {
            await deletePayslip(payslipId);
            setSelectedPayslip(null);
            await loadData();
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed.");
        }
    }

    function openPayslip(payslip) {
        setSelectedPayslip(payslip);
        setEditValues({
            allowances: payslip.allowances ?? 0,
            deductions: payslip.deductions ?? 0
        });
    }

    function closeModal() {
        setSelectedPayslip(null);
    }

    function handleEditChange(e) {
        const { name, value } = e.target;
        setEditValues((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSave() {
        setSaving(true);
        try {
            await updatePayslip(selectedPayslip.id, {
                employeeId: selectedPayslip.employeeId,
                month: selectedPayslip.month,
                year: selectedPayslip.year,
                allowances: Number(editValues.allowances),
                deductions: Number(editValues.deductions)
            });
            setSelectedPayslip(null);
            await loadData();
        } catch (err) {
            alert(err.response?.data?.message || "Update failed.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <Loader />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-navy mb-1">Payroll</h1>
            <p className="text-text-muted mb-6">Generate and review monthly payslips</p>

            <div className="flex gap-4 mb-6">
                <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="px-4 py-2 border rounded-lg"
                >
                    {MONTH_NAMES.map((name, index) => (
                        <option key={name} value={index + 1}>{name}</option>
                    ))}
                </select>

                <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="px-4 py-2 border rounded-lg"
                >
                    {[year - 1, year, year + 1].map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-left">Employee</th>
                            <th className="text-left">Department</th>
                            <th className="text-left">Basic Salary</th>
                            <th className="text-left">Leave Days</th>
                            <th className="text-left">Net Pay</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => {
                            const payslip = payslipFor(employee.id);
                            const busy = generatingId === employee.id;

                            return (
                                <tr key={employee.id} className="border-b border-border hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        {employee.firstname} {employee.lastname}
                                    </td>
                                    <td>{employee.departmentName || "-"}</td>
                                    <td>{payslip ? `₹${payslip.basicSalary}` : "-"}</td>
                                    <td>{payslip ? payslip.leaveDeductionDays : "-"}</td>
                                    <td className="font-medium">
                                        {payslip ? `₹${payslip.netPay}` : "-"}
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            {!payslip && (
                                                <Button
                                                    variant="primary"
                                                    disabled={busy}
                                                    onClick={() => handleGenerate(employee.id)}
                                                >
                                                    Generate
                                                </Button>
                                            )}
                                            {payslip && (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => openPayslip(payslip)}
                                                >
                                                    View / Edit
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <FormModal
                isOpen={!!selectedPayslip}
                title={selectedPayslip ? `Payslip — ${selectedPayslip.employeeName}` : ""}
                onClose={closeModal}
            >
                {selectedPayslip && (
                    <div>
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                                <p className="text-gray-500">Period</p>
                                <p className="font-medium">
                                    {MONTH_NAMES[selectedPayslip.month - 1]} {selectedPayslip.year}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500">Department</p>
                                <p className="font-medium">{selectedPayslip.departmentName || "-"}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Basic Salary</p>
                                <p className="font-medium">₹{selectedPayslip.basicSalary}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Leave Deduction Days</p>
                                <p className="font-medium">{selectedPayslip.leaveDeductionDays}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Generated On</p>
                                <p className="font-medium">{selectedPayslip.generatedDate}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Net Pay</p>
                                <p className="font-semibold text-lg text-navy">₹{selectedPayslip.netPay}</p>
                            </div>
                        </div>

                        <Input
                            label="Allowances"
                            type="number"
                            name="allowances"
                            value={editValues.allowances}
                            onChange={handleEditChange}
                        />

                        <Input
                            label="Deductions"
                            type="number"
                            name="deductions"
                            value={editValues.deductions}
                            onChange={handleEditChange}
                        />

                        <div className="flex justify-between mt-6">
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(selectedPayslip.id)}
                            >
                                Delete Payslip
                            </Button>

                            <Button
                                variant="primary"
                                disabled={saving}
                                onClick={handleSave}
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                )}
            </FormModal>
        </div>
    );
}