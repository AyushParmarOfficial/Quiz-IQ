export default function RadioButton({ checked, onChange, className= '', ...props }) {

    return (
        <input 
            {...props}
            type="radio"
            onChange={onChange}
            checked={checked}
            className={
                'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500' +
                className
            }
        />
    );
}