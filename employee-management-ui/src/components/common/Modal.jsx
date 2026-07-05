export default function Modal({
    isOpen,
    title,
    message,
    onClose,
    onConfirm
}) {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-[400px] p-6">

                <h2 className="text-2xl font-bold mb-4">

                    {title}

                </h2>

                <p className="text-gray-600">

                    {message}

                </p>

                <div className="flex justify-end gap-4 mt-8">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}