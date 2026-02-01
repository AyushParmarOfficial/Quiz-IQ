export default function TextInput({ name, value, id, onChange, type='text' ,className='', ...props  }){
    return (
        <>
            <input  
                {...props} 
                type={type} 
                value={value} 
                onChange={onChange}
                name={name} 
                id={id} 
                className={`rounded-md px-2 shadow-lg/10 w-full lg:h-[35px] md:h-[25px] h-[30px] ${className}`} />
        </>
    );
}