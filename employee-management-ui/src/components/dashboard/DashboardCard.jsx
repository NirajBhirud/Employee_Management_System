import { motion } from "framer-motion";

export default function DashboardCard({
    title,
    value,
    icon,
    color
}) {

    return (

        <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg p-6"
        >

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {value}
                    </h2>

                </div>

                <div
                    className={`${color} p-4 rounded-xl text-white`}
                >
                    {icon}
                </div>

            </div>

        </motion.div>

    );

}