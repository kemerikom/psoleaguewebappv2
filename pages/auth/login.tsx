//import WorldMap from "../../../components/WorldMap"
import { useState } from "react"
import { loginUser } from "../../utils/firebase/loginUser"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Login(){
    const router = useRouter()
    const [email,setEmail]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    return(
        <div className="flex flex-row">
            <div className='flex flex-col space-y-2 w-full max-w-md p-3 items-center justify-start h-[calc(100vh-40px)] bg-blue-600 text-white'>
                <h1>Login</h1>
                <hr/>
                <div className="flex flex-col space-y-2 px-3 w-full">
                    <div className="flex flex-col space-y-1">
                        <input className="inputSignUp peer" defaultValue={email} onChange={(e)=>setEmail(e.target.value)} type={'email'} maxLength={100} placeholder="E-mail"/>
                        <label className="peer-invalid:flex hidden text-gray-300">Invalid e-mail adress</label>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <input className="inputSignUp peer" defaultValue={password} onChange={(e)=>setPassword(e.target.value)} type={'password'} minLength={6} maxLength={30} placeholder="Password"/>
                        <label className="peer-invalid:flex hidden text-gray-300">Password must more than 6 characters</label>
                    </div>
                    <hr/>
                    <button className="bg-green-900 py-2 px-4 rounded" onClick={loginBtn}>Login</button>
                </div>
                <hr/>
                <div className="flex flex-row w-full items-center justify-between">
                    <Link className="hover:underline transition-all" href='/'>Sign Up</Link>
                    <Link className="hover:underline transition-all" href='/'>Forgot my password</Link>
                </div>
            </div>
            <div className="flex flex-col w-full max-h-[calc(100vh-40px)] items-center justify-center">
                <h1 className="text-2xl mt-2">Official Leagues</h1>
                {/* <WorldMap/> */}
            </div>
        </div>
    )
    /* async function loginBtn() {
        const result = await loginUser({email,password})
        if(!result){
            alert("Hatalı şifre")
        }else{
            router.push('/')
        }
    } */

    async function loginBtn() {
        const result = await loginUser({email,password})
        if(!result){
            alert("Hatalı şifre")
        }else{
            fetch(`${process.env.appPath}/api/loginUserApi`,{
                method:'POST',
                body:JSON.stringify({email,password})
            })
            router.push('/')
        }
        
    }
}