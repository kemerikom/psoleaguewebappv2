import { withIronSessionSsr } from "iron-session/next"
import { playerType, teamsType } from "../../typings"
import { getUserByUid } from "../../utils/mongodb/getUsers"
import PosInput from "../../components/PosInput"
import { useState } from "react"
import CountryInput from '../../components/CountryInput'
import CountryList from '../../utils/src/countryList.json'
import { getTeamByPlayer } from "../../utils/mongodb/getTeams"
import SettingsList from '../../components/settings/SettingList'
import Header from '../../components/settings/Header'
import { IoFootball } from "react-icons/io5"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type posType={
    pos:string
}

type countryType={
    name:string,
    code:string
}


export default function Account({user,uid,userTeam}:{user:playerType,uid:string,userTeam:teamsType}){
    const [mainPos,setMainPos]=useState<posType>({pos:user.mainpos})
    const [secPos,setSecPos]=useState<posType>({pos:user.secondpos})
    const [country,setCountry]=useState<countryType>(
        {name:CountryList.find((ct:countryType)=>ct.code==user.country)?.name||'',
        code:CountryList.find((ct:countryType)=>ct.code==user.country)?.code||''}
    )
    const [loading,setLoading]=useState<boolean>(false)
    return(
        <div className='flex flex-row max-w-5xl w-full p-3 items-start'>
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
            <SettingsList/>
            <div className='flex w-full flex-col'>
                <Header user={user} userTeam={userTeam}/>
                <div className="p-2 bg-white backdrop-blur-sm bg-opacity-70 rounded my-2">
                    <div className='flex flex-col space-y-2 items-center justify-center'>
                        <h1 className='text-center'>Account Settings</h1>
                        <hr/>
                        <div className='flex flex-col max-w-lg w-full space-y-2'>
                            <PosInput value={mainPos} setValue={setMainPos} placeholder='Main position'/>
                            <PosInput value={secPos} setValue={setSecPos} placeholder='Second position'/>
                            <CountryInput value={country} setValue={setCountry} cCode={country.code}/>
                            <button onClick={saveDatas} className='ml-auto bg-blue-600 text-white py-2 px-4 rounded'>
                                {!loading&&'Save'}
                                {loading&&
                                    <IoFootball className="text-2xl animate-spin"/>
                                }
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
    async function saveDatas() {
        setLoading(true)
        const data ={
            uid,
            mainpos:mainPos.pos,
            secondpos:secPos.pos,
            country:country.code
        }
        const res = await fetch(`${process.env.appPath}/api/updateAccountApi`,{
            method:'POST',
            body:JSON.stringify(data)
        })
        const result = await res.json()
        if(res.status==200){
            toast.success('Your profile succesfully updated')
        }else{
            toast.error(result)
        }
        setLoading(false)
    }
}


export const getServerSideProps=withIronSessionSsr(
    async function getServerSideProps({req}) {
        const userUid=req.session.user
        let userData=null
        let uUid=null
        let userTeam=null
        if(userUid){
            const {uid} = userUid
            uUid=uid
            const user = await getUserByUid({uid:uid||'null'})
            if(user){
                userData=user
                const team = await getTeamByPlayer({userId:user._id.toString()})
                if(team)userTeam=team
            }
        }
        return{
            props:{
                user:JSON.parse(JSON.stringify(userData)),
                uid:uUid,
                userTeam:JSON.parse(JSON.stringify(userTeam))
            }
        }
    },{
        cookieName:process.env.ironCookie,
        password:process.env.ironPassword,
        cookieOptions:{
            secure:process.env.NODE_ENV==='production'
        }
    }
)