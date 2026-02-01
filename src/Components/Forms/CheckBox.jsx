export default function Checkbox({ checked, onChange, className = '', ...props }) {

    return (
        <input
            {...props}
            type="checkbox"
            onChange={onChange}
            checked={checked}
            className={
                'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ' +
                className
            }
        />
    );
}