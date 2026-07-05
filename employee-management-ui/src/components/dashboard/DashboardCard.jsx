export default function DashboardCard({ title, value, icon, color }) {
    return (
        <div className="bg-white rounded-lg border border-border p-6 flex justify-between items-center">
            <div>
                <p className="text-text-muted text-sm">{title}</p>
                <h2 className="text-3xl font-semibold mt-1 tabular">{value}</h2>
            </div>
            <div className={`${color} p-3 rounded-lg`}>
                {icon}
            </div>
        </div>
    );
}