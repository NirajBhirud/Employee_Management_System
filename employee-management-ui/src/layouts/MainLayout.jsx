import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {

    return (

        <div className="flex bg-slate-100 min-h-screen">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Navbar />

                <main className="flex-1 p-8">

                    <Outlet />

                </main>

                <Footer />

            </div>

        </div>

    );

}