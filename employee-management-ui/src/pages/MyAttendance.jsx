import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { checkIn, checkOut, getAttendanceByEmployee, getMonthlySummary } from "../services/attendanceService";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

function todayIso() {
    return new Date().toISOString().split("T")[0];
}

function firstOfMonthIso() {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0];
}

export default function MyAttendance() {
    const { auth } = useAuth();
    const employeeId = auth?.employeeId;

    const [records, setRecords] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    const today = todayIso();
    const now = new Date();

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
            const [recordsRes, summaryRes] = await Promise.all([
                getAttendanceByEmployee(employeeId, firstOfMonthIso(), today),
                getMonthlySummary(employeeId, now.getFullYear(), now.getMonth() + 1)
            ]);
            setRecords(recordsRes.data);
            setSummary(summaryRes.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load your attendance.");
        } finally {
            setLoading(false);
        }
    }

    const todayRecord = records.find((r) => r.date === today);

    async function handleCheckIn() {
        setBusy(true);
        try {
            await checkIn(employeeId);
            await loadData();
        } catch (err) {
            alert(err.response?.data?.message || "Check-in failed.");
        } finally {
            setBusy(false);
        }
    }

    async function handleCheckOut() {
        setBusy(true);
        try {
            await checkOut(employeeId);
            await loadData();
        } catch (err) {
            alert(err.response?.data?.message || "Check-out failed.");
        } finally {
            setBusy(false);
        }
    }

    if (loading) return <Loader />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-navy mb-1">My Attendance</h1>
            <p className="text-text-muted mb-6">{today}</p>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            {!error && (
                <>
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-text-muted text-sm">Today's Status</p>
                            <p className="text-lg font-medium text-navy">{todayRecord?.status || "Not Marked"}</p>
                        </div>

                        <div className="flex gap-3">
                            {!todayRecord && (
                                <Button variant="primary" disabled={busy} onClick={handleCheckIn}>
                                    Check In
                                </Button>
                            )}
                            {todayRecord && !todayRecord.checkOutTime && todayRecord.checkInTime && (
                                <Button variant="secondary" disabled={busy} onClick={handleCheckOut}>
                                    Check Out
                                </Button>
                            )}
                        </div>
                    </div>

                    {summary && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white rounded-xl shadow p-4 text-center">
                                <p className="text-2xl font-semibold text-navy">{summary.presentDays}</p>
                                <p className="text-text-muted text-sm">Present</p>
                            </div>
                            <div className="bg-white rounded-xl shadow p-4 text-center">
                                <p className="text-2xl font-semibold text-navy">{summary.halfDays}</p>
                                <p className="text-text-muted text-sm">Half-Day</p>
                            </div>
                            <div className="bg-white rounded-xl shadow p-4 text-center">
                                <p className="text-2xl font-semibold text-navy">{summary.leaveDays}</p>
                                <p className="text-text-muted text-sm">Leave</p>
                            </div>
                            <div className="bg-white rounded-xl shadow p-4 text-center">
                                <p className="text-2xl font-semibold text-navy">{summary.absentDays}</p>
                                <p className="text-text-muted text-sm">Absent</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-left">Date</th>
                                    <th className="text-left">Check-In</th>
                                    <th className="text-left">Check-Out</th>
                                    <th className="text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((record) => (
                                    <tr key={record.id} className="border-b border-border">
                                        <td className="px-6 py-4">{record.date}</td>
                                        <td>{record.checkInTime || "-"}</td>
                                        <td>{record.checkOutTime || "-"}</td>
                                        <td>{record.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}