import { useState } from "react"


export type InputNameProps={
    onSubmit:(name:string)=>void
}

export default function InputComponent({onSubmit}:InputNameProps){
    const[name,setName]=useState('')

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        localStorage.setItem("UserName",name)
        onSubmit(name)
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                    type="text" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}