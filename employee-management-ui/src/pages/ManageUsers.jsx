import { useEffect, useState } from "react";

import { getEmployees } from "../services/employeeService";
import { register } from "../services/authService";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function ManageUsers() {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({ username: "", password: "", role: "EMPLOYEE", employeeId: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getEmployees().then((res) => setEmployees(res.data)).catch(() => {});
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);
        try {
            await register({
                username: form.username,
                password: form.password,
                role: form.role,
                employeeId: form.role === "EMPLOYEE" ? Number(form.employeeId) : null
            });
            setMessage(`Account created for ${form.username} (${form.role}).`);
            setForm({ username: "", password: "", role: "EMPLOYEE", employeeId: "" });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create account.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6 max-w-lg">
            <h1 className="text-2xl font-semibold text-navy mb-1">Manage Users</h1>
            <p className="text-text-muted mb-6">Create login accounts for staff or employees</p>

            {message && <div className="text-green-600 mb-4">{message}</div>}
            {error && <div className="text-red-600 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-8">
                <Input
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Role</label>
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="ADMIN">Admin</option>
                        <option value="HR">HR</option>
                        <option value="EMPLOYEE">Employee</option>
                    </select>
                </div>

                {form.role === "EMPLOYEE" && (
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Linked Employee</label>
                        <select
                            name="employeeId"
                            value={form.employeeId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Employee</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.firstname} {emp.lastname}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Account"}
                </Button>
            </form>
        </div>
    );
}