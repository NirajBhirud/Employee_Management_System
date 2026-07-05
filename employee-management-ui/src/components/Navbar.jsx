export default function Navbar() {

    return (

        <header className="bg-white h-16 shadow flex justify-between items-center px-8">

            <h2 className="text-2xl font-bold text-slate-700">

                Employee Management System

            </h2>

            <div className="flex items-center gap-3">

                <img
                    src="https://i.pravatar.cc/40"
                    alt="Admin"
                    className="rounded-full"
                />

                <span className="font-semibold">

                    Admin

                </span>

            </div>

        </header>

    );

}