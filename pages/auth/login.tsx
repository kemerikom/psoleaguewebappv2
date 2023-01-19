//import WorldMap from "../../../components/WorldMap"
import { useState } from "react"
import { loginUser } from "../../utils/firebase/loginUser"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoFootball } from "react-icons/io5";
import { withSessionSsr } from "../../utils/src/ironSessionHandlers";

export default function Login(){
    const router = useRouter()
    const [email,setEmail]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const [loading,setLoading]=useState<boolean>(false)
    return(
        <div className="flex flex-row">
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
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
                    <button className="flex bg-green-900 py-2 px-4 rounded items-center justify-center" onClick={loginBtn}>
                        {!loading && 'Login'}
                        {loading && 
                            <IoFootball className="flex text-2xl animate-spin"/>
                        }
                    </button>
                </div>
                <hr/>
                <div className="flex flex-row w-full items-center justify-between">
                    <Link className="hover:underline transition-all" href='/auth/signup'>Sign Up</Link>
                    <Link className="hover:underline transition-all" href='/'>Forgot my password</Link>
                </div>
            </div>
            <div className="flex flex-col w-full max-h-[calc(100vh-40px)] items-center justify-center">
                <h1 className="text-2xl mt-2">Official Leagues</h1>
                {/* <WorldMap/> */}
            </div>
        </div>
    )

    async function loginBtn() {
        setLoading(true)
        const res = await fetch(`${process.env.appPath}/api/loginUserApi`,{
            method:'POST',
            body:JSON.stringify({email,password})
        })

        if(res.status === 200){
            await loginUser({email,password})
            router.push('/')
        }else{
            const result= await res.json()
            toast.error(result)
        }
        setLoading(false)
    }
}


export const getServerSideProps = withSessionSsr (
    async function getServerSideProps({req}) {
        const user = req.session.user
        if(user){
            return{
                redirect:{
                    permanent: false,
                    destination: '/'
                }
            }
        }
        return{
            props:{}
        }
        
    }
)