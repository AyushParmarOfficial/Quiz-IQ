import { FaSpinner } from "react-icons/fa";

export default function SubmitBtn({ value, isLoading, disabled, className = '', ...props }) {
    return (
        <button
            {...props}
            type="submit"
            disabled={disabled || isLoading}
            className={`flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
        >
            {isLoading && <FaSpinner className="animate-spin" />}
            {value}
        </button>
    )
}