import { useEffect, useState } from "react";

import { getPendingLeaveRequests, getAllLeaveRequests, approveLeave, rejectLeave } from "../services/leaveService";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import FormModal from "../components/common/FormModal";

function statusClasses(status) {
    if (status === "APPROVED") return "bg-green-100 text-green-700";
    if (status === "REJECTED") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
}

export default function LeaveApprovals() {
    const [pending, setPending] = useState([]);
    const [all, setAll] = useState([]);
    const [loading, setLoading] = useState(true);
    const [decisionTarget, setDecisionTarget] = useState(null); // { request, action: "approve" | "reject" }
    const [paid, setPaid] = useState(true);
    const [comment, setComment] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        setLoading(true);
        try {
            const [pendingRes, allRes] = await Promise.all([
                getPendingLeaveRequests(),
                getAllLeaveRequests()
            ]);
            setPending(pendingRes.data);
            setAll(allRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function openDecision(request, action) {
        setDecisionTarget({ request, action });
        setPaid(true);
        setComment("");
    }

    function closeDecision() {
        setDecisionTarget(null);
    }

    async function confirmDecision() {
        setSaving(true);
        try {
            if (decisionTarget.action === "approve") {
                await approveLeave(decisionTarget.request.id, { paid, comment });
            } else {
                await rejectLeave(decisionTarget.request.id, { comment });
            }
            setDecisionTarget(null);
            await loadData();
        } catch (err) {
            alert(err.response?.data?.message || "Action failed.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <Loader />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-navy mb-1">Leave Approvals</h1>
            <p className="text-text-muted mb-6">Review pending leave requests</p>

            <h2 className="text-lg font-semibold text-navy mb-4">Pending ({pending.length})</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <table className="w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-left">Employee</th>
                            <th className="text-left">Department</th>
                            <th className="text-left">Dates</th>
                            <th className="text-left">Reason</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pending.map((r) => (
                            <tr key={r.id} className="border-b border-border hover:bg-slate-50">
                                <td className="px-6 py-4">{r.employeeName}</td>
                                <td>{r.departmentName || "-"}</td>
                                <td>{r.startDate} to {r.endDate}</td>
                                <td>{r.reason || "-"}</td>
                                <td>
                                    <div className="flex justify-center gap-2">
                                        <Button variant="primary" onClick={() => openDecision(r, "approve")}>
                                            Approve
                                        </Button>
                                        <Button variant="danger" onClick={() => openDecision(r, "reject")}>
                                            Reject
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {pending.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-text-muted">
                                    No pending requests.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <h2 className="text-lg font-semibold text-navy mb-4">All Requests</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-left">Employee</th>
                            <th className="text-left">Dates</th>
                            <th className="text-left">Status</th>
                            <th className="text-left">Reviewed By</th>
                            <th className="text-left">Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {all.map((r) => (
                            <tr key={r.id} className="border-b border-border">
                                <td className="px-6 py-4">{r.employeeName}</td>
                                <td>{r.startDate} to {r.endDate}</td>
                                <td>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusClasses(r.status)}`}>
                                        {r.status}
                                        {r.status === "APPROVED" && (r.paid ? " (Paid)" : " (Unpaid)")}
                                    </span>
                                </td>
                                <td>{r.reviewedBy || "-"}</td>
                                <td>{r.reviewComment || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <FormModal
                isOpen={!!decisionTarget}
                title={decisionTarget?.action === "approve" ? "Approve Leave" : "Reject Leave"}
                onClose={closeDecision}
            >
                {decisionTarget && (
                    <div>
                        <p className="text-sm text-gray-600 mb-4">
                            {decisionTarget.request.employeeName}, {decisionTarget.request.startDate} to {decisionTarget.request.endDate}
                        </p>

                        {decisionTarget.action === "approve" && (
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Pay Status</label>
                                <select
                                    value={paid ? "paid" : "unpaid"}
                                    onChange={(e) => setPaid(e.target.value === "paid")}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="paid">Paid (no salary deduction)</option>
                                    <option value="unpaid">Unpaid (deducted from salary)</option>
                                </select>
                            </div>
                        )}

                        <label className="block mb-2 text-sm font-medium text-gray-700">Comment (optional)</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                        />

                        <div className="flex justify-end gap-3">
                            <Button variant="secondary" onClick={closeDecision}>
                                Cancel
                            </Button>
                            <Button variant="primary" disabled={saving} onClick={confirmDecision}>
                                {saving ? "Saving..." : "Confirm"}
                            </Button>
                        </div>
                    </div>
                )}
            </FormModal>
        </div>
    );
}