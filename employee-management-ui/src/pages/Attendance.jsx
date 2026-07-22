import { useEffect, useState } from "react";

import { getEmployees } from "../services/employeeService";
import {
    checkIn,
    checkOut,
    getAttendanceByDate,
    markAttendance
} from "../services/attendanceService";

import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

function todayIso() {
    return new Date().toISOString().split("T")[0];
}

export default function Attendance() {
    const [employees, setEmployees] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actioningId, setActioningId] = useState(null);

    const today = todayIso();

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        setLoading(true);
        setError("");
        try {
            const [employeesRes, attendanceRes] = await Promise.all([
                getEmployees(),
                getAttendanceByDate(today)
            ]);
            setEmployees(employeesRes.data);
            setRecords(attendanceRes.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load attendance data.");
        } finally {
            setLoading(false);
        }
    }

    function recordFor(employeeId) {
        return records.find((r) => r.employeeId === employeeId);
    }

    async function handleCheckIn(employeeId) {
        setActioningId(employeeId);
        try {
            await checkIn(employeeId);
            await loadData();
        } catch (err) {
            alert(err.response?.data?.message || "Check-in failed.");
        } finally {
            setActioningId(null);
        }
    }

    async function handleCheckOut(employeeId) {
        setActioningId(employeeId);
        try {
            await checkOut(employeeId);
            await loadData();
        } catch (err) {
            alert(err.response?.data?.message || "Check-out failed.");
        } finally {
            setActioningId(null);
        }
    }

    async function handleMarkLeave(employeeId) {
        setActioningId(employeeId);
        try {
            await markAttendance({ employeeId, date: today, status: "Leave" });
            await loadData();
        } catch (err) {
            alert(err.response?.data?.message || "Marking leave failed.");
        } finally {
            setActioningId(null);
        }
    }

    if (loading) return <Loader />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-navy mb-1">Attendance</h1>
            <p className="text-text-muted mb-6">{today}</p>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-left">Employee</th>
                            <th className="text-left">Department</th>
                            <th className="text-left">Check-In</th>
                            <th className="text-left">Check-Out</th>
                            <th className="text-left">Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => {
                            const record = recordFor(employee.id);
                            const busy = actioningId === employee.id;

                            return (
                                <tr key={employee.id} className="border-b border-border hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        {employee.firstname} {employee.lastname}
                                    </td>
                                    <td>{employee.departmentName || "-"}</td>
                                    <td>{record?.checkInTime || "-"}</td>
                                    <td>{record?.checkOutTime || "-"}</td>
                                    <td>
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                                            {record?.status || "Not Marked"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            {!record && (
                                                <Button
                                                    variant="primary"
                                                    disabled={busy}
                                                    onClick={() => handleCheckIn(employee.id)}
                                                >
                                                    Check In
                                                </Button>
                                            )}
                                            {record && !record.checkOutTime && record.checkInTime && (
                                                <Button
                                                    variant="secondary"
                                                    disabled={busy}
                                                    onClick={() => handleCheckOut(employee.id)}
                                                >
                                                    Check Out
                                                </Button>
                                            )}
                                            {!record && (
                                                <Button
                                                    variant="secondary"
                                                    disabled={busy}
                                                    onClick={() => handleMarkLeave(employee.id)}
                                                >
                                                    Mark Leave
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
        </div>
    );
}