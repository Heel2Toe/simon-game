interface TextInputProps{
    placeholder: string,
    name: string,
    type?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
}
const TextInput: React.FC<TextInputProps> = ({
    placeholder,
    name,
    type,
    onChange
}) => {
    return ( 
        <input 
        className="h-10 w-[80%] p-2 text-sm rounded-md  outline-none border border-zinc-950 bg-transparent placeholder-gray-600"
        type={type ? type : 'text'} 
        name={name} 
        placeholder={placeholder}
        onChange={onChange}
        required
            />
     );
}
 
export default TextInput;