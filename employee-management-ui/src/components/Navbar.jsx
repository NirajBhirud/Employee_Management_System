import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onMenuClick }) {
    const { auth } = useAuth();
    const initial = auth?.username ? auth.username.charAt(0).toUpperCase() : "?";

    return (
        <header className="bg-white h-16 border-b border-border flex justify-between items-center px-4 md:px-8 gap-3">
            <div className="flex items-center gap-3 min-w-0">
                <button onClick={onMenuClick} className="lg:hidden text-navy shrink-0">
                    <Menu size={22} />
                </button>
                <h2 className="text-base md:text-lg font-semibold text-navy truncate">
                    Employee Management System
                </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <div className="w-9 h-9 rounded-full bg-teal-light text-teal flex items-center justify-center font-semibold text-sm">
                    {initial}
                </div>
                <div className="hidden sm:flex flex-col leading-tight">
                    <span className="font-medium text-sm text-text">{auth?.username}</span>
                    <span className="text-xs text-text-muted">{auth?.role}</span>
                </div>
            </div>
        </header>
    );
}