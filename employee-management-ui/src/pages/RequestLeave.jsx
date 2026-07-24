import { useEffect, useState } from "react";

import { requestLeave, getMyLeaveRequests } from "../services/leaveService";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

function statusClasses(status) {
    if (status === "APPROVED") return "bg-green-100 text-green-700";
    if (status === "REJECTED") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
}

export default function RequestLeave() {
    const [form, setForm] = useState({ startDate: "", endDate: "", reason: "" });
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRequests();
    }, []);

    async function loadRequests() {
        setLoading(true);
        try {
            const res = await getMyLeaveRequests();
            setRequests(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await requestLeave(form);
            setForm({ startDate: "", endDate: "", reason: "" });
            await loadRequests();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit leave request.");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <Loader />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-navy mb-1">Request Leave</h1>
            <p className="text-text-muted mb-6">Submit a leave request for approval</p>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="End Date"
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                />

                <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Reason</label>
                    <textarea
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Briefly explain the reason for leave"
                    />
                </div>

                <div className="md:col-span-2">
                    <Button type="submit" variant="primary" disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit Request"}
                    </Button>
                </div>
            </form>

            <h2 className="text-lg font-semibold text-navy mb-4">My Leave Requests</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-left">Dates</th>
                            <th className="text-left">Reason</th>
                            <th className="text-left">Status</th>
                            <th className="text-left">Reviewer Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((r) => (
                            <tr key={r.id} className="border-b border-border">
                                <td className="px-6 py-4">{r.startDate} to {r.endDate}</td>
                                <td>{r.reason || "-"}</td>
                                <td>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusClasses(r.status)}`}>
                                        {r.status}
                                        {r.status === "APPROVED" && (r.paid ? " (Paid)" : " (Unpaid)")}
                                    </span>
                                </td>
                                <td>{r.reviewComment || "-"}</td>
                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-text-muted">
                                    No leave requests yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}