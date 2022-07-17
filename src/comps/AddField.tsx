import {Dispatch, FC, SetStateAction} from 'react'

interface AddFieldProps {
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
    add: ()=>void;
}

const AddField:FC<AddFieldProps> = ({input, setInput, add}) => {
    return (
        <div className='flex flex-col gap-2 p-5 border border-slate-500'>
            <input 
                className='border border-slate-500 bg-slate-200 p-1' 
                placeholder="Enter stock symbol"
                type="text" 
                value={input} 
                onChange={e=>setInput(e.target.value)} 
                required 
            />
            <button 
                className='border border-slate-500 bg-slate-400 text-slate-200 p-1' 
                onClick={add}
            >ADD</button>
        </div>
    )
}

export default AddField