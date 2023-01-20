import { useState } from 'react'
import { getUserByUid } from '../utils/mongodb/getUsers'
import { withSessionSsr } from '../utils/src/ironSessionHandlers'
import CountryList from '../utils/src/countryList.json'
import { Combobox } from '@headlessui/react'
import ReactCountryFlag from 'react-country-flag'
import {IoFootball, IoPeopleCircle} from 'react-icons/io5'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type countryType={
    name:string,
    code:string
}


export default function CreateTeam(){
    const router = useRouter()
    let bs = Math.floor(Math.random()*(350))+150
    const [country, setCountry]=useState<countryType>({name:'',code:''})
    const [query, setQuery] = useState<string>('')
    const [teamName, setTeamName] = useState<string>('')
    const [shortName, setShortName] = useState<string>('')
    const [color1, setColor1] = useState<string>('#ffffff')
    const [color2, setColor2] = useState<string>('#dddddd')
    const [fontColor, setFontColor] = useState<string>('#000000')
    const [loading, setLoading] = useState<boolean>(false)
    const filteredCountry=
    query==''?CountryList:CountryList.filter((ct)=>{
        return ct.name.toLocaleLowerCase().includes(query.toLowerCase())
    })
    return(
        <div className="flex container mx-auto items-center justify-center my-3">
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
            <div className="flex flex-col max-w-5xl w-full p-2 space-y-2 rounded bg-white backdrop-blur-sm bg-opacity-70 items-center">
                <h1>Create Team</h1>
                <hr/>
                <div id='teamBack' className='flex w-full p-2 rounded'>
                    <style jsx>
                        {`
                            #teamBack{
                                background: linear-gradient(-45deg, ${color1}, ${color2},${color1}, ${color2});
                                background-size: ${bs}% ${bs}%;
                                animation: gradient 5s ease infinite;
                            }
                            @keyframes gradient{
                                0% {
                                    background-position: 0% 50%;
                                }
                                50% {
                                    background-position: 100% 50%;
                                }
                                100% {
                                    background-position: 0% 50%;
                                }
                            }
                        `}
                    </style>
                    <div  className="flex flex-row space-x-2 items-center">
                        <div className="flex items-center w-16 h-16 aspect-square rounded-full">
                            
                            <div className="flex w-16 h-16 items-center justify-center rounded-full"
                            style={{backgroundColor: color1}}
                            >
                                <IoPeopleCircle className="text-4xl"
                                style={{color: color2}}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col cursor-pointer">
                            <h3 className="cursor-pointer"
                            style={{color: fontColor}}
                            >
                                <b>Team Name:</b> {teamName}
                            </h3>
                            <h3 className="cursor-pointer"
                            style={{color: fontColor}}
                            >
                                <b>Team Tag:</b> {shortName}
                            </h3>
                        </div>
                    </div>
                </div>
                <hr/>
                <input className='flex rounded p-2 w-64' defaultValue={teamName} onChange={((e) => setTeamName(e.target.value))} placeholder='Team name' minLength={3} maxLength={30}/>
                <input className='flex rounded p-2 w-64' defaultValue={shortName} onChange={((e) => setShortName(e.target.value))} placeholder='Team tag' minLength={3} maxLength={4}/>
                <Combobox className='relative' as='div' value={country} onChange={setCountry}>
                    <Combobox.Input className={'flex rounded p-2 w-64'} placeholder='Team origin' onChange={(e)=>setQuery(e.target.value)} displayValue={(country:{code:string,name:string})=>country.name}></Combobox.Input>
                    <Combobox.Options className={'flex flex-col w-full absolute top-12 left-0 z-10 bg-white max-h-96 overflow-auto p-2 rounded'}>
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
                <label className='flex flex-row rounded p-2 bg-white w-64 justify-between'>
                    Team primary color: 
                    <input type={'color'} className='flex rounded w-10 ml-1' defaultValue={color1} onChange={((e) => setColor1(e.target.value))}/>
                </label>
                <label className='flex flex-row rounded p-2 bg-white w-64 justify-between'>
                    Team secondary color: 
                    <input type={'color'} className='flex rounded w-10 ml-1' defaultValue={color2} onChange={((e) => setColor2(e.target.value))}/>
                </label>
                <label className='flex flex-row rounded p-2 bg-white w-64 justify-between'>
                    Label color:  
                    <input type={'color'} className='flex rounded w-10 ml-1' defaultValue={fontColor} onChange={((e) => setFontColor(e.target.value))}/>
                </label>
                <button className='btnPrimary' onClick={createTeam}>
                    {loading && 
                        <IoFootball className='text-2xl animate-spin'/>
                    }
                    {!loading && 
                        'Create Team'
                    }
                </button>
            </div>
        </div>
    )
    async function createTeam() {
        if( teamName == '' || teamName.length<3){
            toast.warn('Invalid team name')
        }else if (shortName == '') {
            toast.warn('Invalid team tag')
        }else if (country.code == ''){
            toast.warn('Please choose a team origin')
        }else{
            setLoading(true)
            const res = await fetch(`${process.env.appPath}/api/createTeamApi`,{
                method: 'POST',
                body: JSON.stringify({
                    teamName,
                    shortName,
                    color1,
                    color2,
                    fontColor,
                    origin:country.code,
                })
            })
            const result = await res.json()
            if (res.status == 200){
                toast.success('Team succesfully created')
                router.push('/myteam')
            }else{
                toast.error(result)
            }
            setLoading(false)
        }
    }
}


export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({req}) {
        const userUid = req.session.user
        if (userUid && userUid.uid){
            const user = await getUserByUid({uid: userUid.uid})
            if (user){
                if (user.teamid != 'free'){
                    return {
                        redirect: {
                            permanent: false,
                            destination: '/myteam'
                        }
                    }
                }else{
                    return {
                        props:{}
                    }
                }
            }else{
                return {
                    redirect: {
                        permanent: false,
                        destination: '/auth/login'
                    }
                }
            }
        }else{
            return {
                redirect :{
                    permanent: false,
                    destination: '/auth/login'
                }
            }
        }

    }
)