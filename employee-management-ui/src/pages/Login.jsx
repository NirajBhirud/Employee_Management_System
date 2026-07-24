import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(username, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid username or password.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-sm">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-md bg-teal text-white flex items-center justify-center font-bold mx-auto mb-3">
                        EM
                    </div>
                    <h1 className="text-xl font-semibold text-navy">Sign in to EMS</h1>
                </div>

                {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter username"
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter password"
                    />

                    <div className="mt-4">
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}