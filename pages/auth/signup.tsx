import {useState} from 'react'
import CountryList from '../../utils/src/countryList.json'
import ReactCountryFlag from "react-country-flag"
import { Combobox } from '@headlessui/react'
import positionList from '../../utils/src/positionList.json'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { IoFootball } from 'react-icons/io5'
import {withSessionSsr} from '../../utils/src/ironSessionHandlers'


type countryType={
    name:string,
    code:string
}

type posType={
    pos:string
}

export default function SignUp(){
    const [userName,setUserName]=useState<string>("")
    const [userNameValid,setUserNameValid]=useState<boolean>(true)
    const [country,setCountry]=useState<countryType>({name:'',code:''})
    const [query,setQuery]=useState<string>('')
    const [mainPos,setMainPos]=useState<posType>({pos:''})
    const [secPos,setSecPos]=useState<posType>({pos:''})
    const [qMainPos,setQMainPos]=useState('')
    const [qSecPos,setQSecPos]=useState('')
    const [email,setEmail]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const [loading,setLoading]=useState<boolean>(false)
    const filteredCountry=
    query==''?CountryList:CountryList.filter((ct)=>{
        return ct.name.toLocaleLowerCase().includes(query.toLowerCase())
    })
    const filteredMainPos=
    qMainPos==''?positionList:positionList.filter((pos)=>{
        return pos.pos.toLocaleLowerCase().includes(qMainPos.toLocaleLowerCase())
    })
    const filteredSecPos=
    qSecPos==''?positionList:positionList.filter((pos)=>{
        return pos.pos.toLocaleLowerCase().includes(qSecPos.toLocaleLowerCase())
    })
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
                <h1>Sign Up</h1>
                <hr/>
                <div className="flex flex-col space-y-2 px-3 w-full">
                    <div className="flex flex-col space-y-1">
                        <input className="inputSignUp peer" defaultValue={userName} onChange={(e)=>userNameCheck(e.target.value)} minLength={4} maxLength={20} placeholder="Username"/>
                        <label className="peer-invalid:flex hidden text-gray-300">Username must more than 3 characters</label>
                        {!userNameValid&&
                            <label className="text-gray-300">Username must only contain letters and numbers</label>
                        }
                    </div>
                    <div className="flex flex-col space-y-1">
                        <input className="inputSignUp peer" defaultValue={email} onChange={(e)=>setEmail(e.target.value)} type={'email'} maxLength={100} placeholder="E-mail"/>
                        <label className="peer-invalid:flex hidden text-gray-300">Invalid e-mail adress</label>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <input className="inputSignUp peer" value={password} onChange={(e)=>setPassword(e.target.value)} type={'password'} minLength={6} maxLength={30} placeholder="Password"/>
                        <label className="peer-invalid:flex hidden text-gray-300">Password must more than 6 characters</label>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <Combobox className='relative' as='div' value={country} onChange={setCountry}>
                            <Combobox.Input className={'inputSignUp'} placeholder='Your country' onChange={(e)=>setQuery(e.target.value)} displayValue={(country:{code:string,name:string})=>country.name}></Combobox.Input>
                            <Combobox.Options className={'flex flex-col w-full absolute top-12 left-0 z-10 bg-blue-900 max-h-96 overflow-auto p-2 rounded'}>
                                {filteredCountry.map((country)=>{
                                    return(
                                        <Combobox.Option className={'flex flex-row py-1 space-x-2 items-center justify-start hover:bg-blue-600 cursor-pointer rounded'} key={country.code} value={country}>
                                            <ReactCountryFlag countryCode={country.code} svg title={country.code} style={{width:'30px'}}/>
                                            <label className="cursor-pointer">{country.name}</label>
                                        </Combobox.Option>
                                    )
                                })}
                            </Combobox.Options>
                        </Combobox>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <Combobox className='relative' as='div' value={mainPos} onChange={setMainPos}>
                            <Combobox.Input className={'inputSignUp'} placeholder='Main Position' onChange={(e)=>setQMainPos(e.target.value)} displayValue={(mainPos:{pos:string})=>mainPos.pos}></Combobox.Input>
                            <Combobox.Options className={'flex flex-col w-full absolute top-12 left-0 z-10 bg-blue-900 max-h-96 overflow-auto p-2 rounded'}>
                                {filteredMainPos.map((pos)=>{
                                    return(
                                        <Combobox.Option className={'flex flex-row py-1 px-2 space-x-2 items-center justify-start hover:bg-blue-600 cursor-pointer rounded'} key={pos.pos} value={pos}>
                                            {pos.pos}
                                        </Combobox.Option>
                                    )
                                })}
                            </Combobox.Options>
                        </Combobox>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <Combobox className='relative' as='div' value={secPos} onChange={setSecPos}>
                            <Combobox.Input className={'inputSignUp'} placeholder='Second Position' onChange={(e)=>setQSecPos(e.target.value)} displayValue={(secPos:{pos:string})=>secPos.pos}></Combobox.Input>
                            <Combobox.Options className={'flex flex-col w-full absolute top-12 left-0 z-10 bg-blue-900 max-h-96 overflow-auto p-2 rounded'}>
                                {filteredSecPos.map((pos)=>{
                                    return(
                                        <Combobox.Option className={'flex flex-row py-1 px-2 space-x-2 items-center justify-start hover:bg-blue-600 cursor-pointer rounded'} key={pos.pos} value={pos}>
                                            {pos.pos}
                                        </Combobox.Option>
                                    )
                                })}
                            </Combobox.Options>
                        </Combobox>
                    </div>
                </div>
                <hr/>
                <button className="bg-green-900 py-2 px-4 rounded" onClick={createUser}>
                    {!loading&&'Sign Up'}
                    {loading&&
                    <IoFootball className='text-2xl animate-spin'/>
                    }
                </button>
                <div className="flex flex-row w-full items-center justify-between">
                    <Link href={'/'} className='hover:underline transition-all'>Already have an account?</Link>
                    <Link href={'/'} className='hover:underline transition-all'>Forgot my password</Link>
                </div>
            </div>
            <div className="flex flex-col w-full max-h-[calc(100vh-40px)] items-center justify-center">
                <h1 className="text-2xl mt-2">Official Leagues</h1>
                {/* <WorldMap/> */}
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
    async function createUser(){
        setLoading(true)
        const data={
            email:email,
            password:password,
            username:userName,
            country:country.code||'XX',
            mainpos:mainPos.pos,
            secpos:secPos.pos
        }
        const res = await fetch(`${process.env.appPath}/api/createUserApi`,{
            method:'POST',
            body:JSON.stringify({
                data
            })
        })
        if(res.status===200){

        }else{
            const result = await res.json()
            toast.error(result)
        }
        setLoading(false)
        //here devam et
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