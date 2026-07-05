export default function Input({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder = "",
    required = false,
    disabled = false,
    error = "",
    className = "",
}) {

    return (

        <div className="mb-4">

            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-700">

                    {label}

                    {required && (
                        <span className="text-red-500 ml-1">*</span>
                    )}

                </label>
            )}

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`
                    w-full
                    px-4
                    py-2
                    border
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-blue-500
                    disabled:bg-gray-100
                    disabled:cursor-not-allowed
                    ${error ? "border-red-500" : "border-gray-300"}
                    ${className}
                `}
            />

            {error && (
                <p className="text-red-500 text-sm mt-1">

                    {error}

                </p>
            )}

        </div>

    );

}