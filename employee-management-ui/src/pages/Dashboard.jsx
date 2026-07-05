import DashboardCard from "../components/dashboard/DashboardCard";
import {
    Users,
    Building2,
    IndianRupee,
    UserPlus
} from "lucide-react";

export default function Dashboard() {

    return (

        <div>

            <h1 className="text-4xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <DashboardCard
                    title="Employees"
                    value="125"
                    icon={<Users size={32} />}
                    color="bg-blue-600"
                />

                <DashboardCard
                    title="Departments"
                    value="8"
                    icon={<Building2 size={32} />}
                    color="bg-green-600"
                />

                <DashboardCard
                    title="Payroll"
                    value="₹18.5L"
                    icon={<IndianRupee size={32} />}
                    color="bg-purple-600"
                />

                <DashboardCard
                    title="New Hires"
                    value="15"
                    icon={<UserPlus size={32} />}
                    color="bg-orange-500"
                />

            </div>

        </div>

    );
}