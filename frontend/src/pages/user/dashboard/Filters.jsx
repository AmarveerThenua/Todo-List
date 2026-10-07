import React from 'react'

const Filters = ({ onFilterChange }) => {
    return (
        <div className="relative w-full sm:w-56">
            <select
                onClick={(e) => {
                    onFilterChange(e.target.value)
                }}
                className="w-full appearance-none px-4 py-3 pr-10
                bg-white border border-gray-200 rounded-xl
                text-sm font-medium text-gray-700
                shadow-sm cursor-pointer
                outline-none
                transition-all duration-200
                hover:border-blue-400
                focus:border-blue-500
                focus:ring-4 focus:ring-blue-100"
            >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="progress">Progress</option>
                <option value="completed">Completed</option>
            </select>

            {/* Custom Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m6 9 6 6 6-6"
                    />
                </svg>
            </div>
        </div>
    )
}

export default Filters