

export default function InputLable({value, classname='', children , ...props }) {
    return (
        <label {...props} className={` block text-sm font-medium   ${classname}`}> {value ? value : children}</label>
    )
}