import { useId } from "react";
import React  from "react";


const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
} , ref) {
    const id = useId();

    return(
        <div className="w-full" >
            {label && <label className="flex flex-col w-full max-w-md" htmlFor={id}>{label}</label>}

            <input
                id={id}
                ref={ref}
                type={type}
                className={`w-full h-14 rounded-xl border border-[#d4dce2] bg-gray-50 px-4 py-3 text-base text-[#101518] placeholder:text-[#5c748a]
           hover:bg-[#dce8f3] hover:border-[#a4c3de]
          focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#cbd5e1]
           transition duration-150 ease-in-out ${className}`}
                {...props}
            
            />
        </div>
    )
})

export default Input;