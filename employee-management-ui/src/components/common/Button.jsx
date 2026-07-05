export default function Button({
    children,
    type = "button",
    variant = "primary",
    onClick,
    disabled = false,
    className = "",
}) {

    const baseStyle =
        "px-4 py-2 rounded-lg font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {

        primary:
            "bg-blue-600 hover:bg-blue-700 text-white",

        secondary:
            "bg-gray-500 hover:bg-gray-600 text-white",

        success:
            "bg-green-600 hover:bg-green-700 text-white",

        warning:
            "bg-yellow-500 hover:bg-yellow-600 text-white",

        danger:
            "bg-red-600 hover:bg-red-700 text-white",

        outline:
            "border border-gray-300 hover:bg-gray-100"

    };

    return (

        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >

            {children}

        </button>

    );

}