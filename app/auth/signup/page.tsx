'use client'
import { useState } from "react"
import ReactFlagsSelect from "react-flags-select";

export default function SignUp() {
    const [userName,setUserName]=useState<string>("")
    const [userNameValid,setUserNameValid]=useState<boolean>(true)
    const [country,setCountry]=useState<string>("")
    return(
        <div className="flex flex-row">
            <div className='flex flex-col space-y-2 w-full max-w-md p-3 items-center justify-start h-[calc(100vh-40px)] bg-blue-600 text-white'>
                <h1>Sign Up</h1>
                <hr/>
                <div className="flex flex-col space-y-2 px-3 w-full">
                    <div className="flex flex-col space-y-1">
                        <input className="inputSignUp peer" value={userName} onChange={(e)=>userNameCheck(e.target.value)} minLength={4} maxLength={20} placeholder="Username"/>
                        <label className="peer-invalid:flex hidden text-gray-300">Username must more than 3 characters</label>
                        {!userNameValid&&
                            <label className="text-gray-300">Username must only contain letters and numbers</label>
                        }
                    </div>
                    <div className="flex flex-col space-y-1">
                        <input className="inputSignUp peer" type={'email'} maxLength={100} placeholder="E-mail"/>
                        <label className="peer-invalid:flex hidden text-gray-300">Invalid e-mail adress</label>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <input className="inputSignUp peer" type={'password'} minLength={6} maxLength={30} placeholder="Password"/>
                        <label className="peer-invalid:flex hidden text-gray-300">Password must more than 6 characters</label>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <ReactFlagsSelect className="inputSignUp text-black" selectButtonClassName="inputSignUp bg-blue-900" placeholder='Select your country' selected={country} onSelect={(e)=>setCountry(e)}/>
                    </div>
                </div>
            </div>
            <div className="flex">
                
            </div>
        </div>

    )
    function userNameCheck(e:string){
        let userNameRegex= new RegExp(/[a-zA-Z0-9]/)
        let arr=e.split('')
        let err=0
        arr.forEach((i)=>{
            if(!userNameRegex.test(i)) err++
        })
        if(err>0){
            setUserNameValid(false)
        }else{
            setUserNameValid(true)
        }
        setUserName(e)
    }
}