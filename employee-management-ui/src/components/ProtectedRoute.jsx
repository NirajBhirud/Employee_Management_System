import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
    const { auth } = useAuth();

    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}