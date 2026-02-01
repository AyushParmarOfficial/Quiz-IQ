export default function TextArea({name, value, id, onChange, className="", ...Props }) {
    return (
        <textarea 
            name={name} 
            id={id} 
            onChange={onChange}
            className={`rounded-md px-2 shadow-lg/10 w-full ${className}`}
        > 
            {value}
        </textarea>
    )
}