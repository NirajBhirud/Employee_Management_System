export default function FormModal({
    isOpen,
    title,
    onClose,
    children,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-red-500"
                    >
                        &times;
                    </button>
                </div>

                {children}

            </div>
        </div>
    );
}