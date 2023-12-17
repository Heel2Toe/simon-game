import { ForwardedRef, forwardRef } from "react"

interface TextInputProps{
    placeholder: string,
    name: string,
    type?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
}
const TextInput: React.ForwardRefRenderFunction<HTMLInputElement,TextInputProps> = ({
    placeholder,
    name,
    type,
    onChange
}, ref) => {
    return ( 
        <input 
        className="h-10 w-[90%] p-2 text-sm rounded-md  outline-none border border-zinc-300 bg-transparent placeholder-gray-600"
        type={type ? type : 'text'} 
        name={name} 
        placeholder={placeholder}
        onChange={onChange}
        ref={ref as ForwardedRef<HTMLInputElement>}
        required
            />
     );
}
 
export default forwardRef(TextInput);