export default function SubmitBtn({value, name, className='', ...props}) {
    return (
        <>
            <button {...props} type="submit" className={className} > {value} </button>
        </>
    )
}