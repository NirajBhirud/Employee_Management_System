import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import DepartmentPage from "./pages/DepartmentPage";
import NotFound from "./pages/NotFound";

export default function App() {

    return (

        <Routes>

            <Route element={<MainLayout />}>

                <Route path="/" element={<Dashboard />} />

                <Route path="/employees" element={<Employees />} />

                <Route path="/departments" element={<DepartmentPage />} />

                <Route path="/add" element={<AddEmployee />} />

                <Route path="/edit/:id" element={<EditEmployee />} />

                <Route path="/employee/:id" element={<EmployeeDetails />} />

            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>

    );

}