export default function Dropdown({name, data, onChange, className, select, json, disabled = true, ...props}) {
    return (
        <select 
            {...props}
            name={name} 
            value={select}
            onChange={onChange}
            className={`w-full px-2 ` + className}
        >
            <option value="" disabled={disabled} selected>
                Select {name}
            </option>
            {data.map((datas, index) => (
                <>
                    <option 
                        key={index} 
                        value={datas.id}
                        data-row={json ? JSON.stringify(datas) : null }
                    >
                        {datas.name}
                    </option>
                </>
            ))}
        </select>
    )
}   