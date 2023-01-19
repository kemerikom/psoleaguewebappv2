import Link from "next/link";
import { FaCrown } from "react-icons/fa";
import { IoBan, IoFootball } from "react-icons/io5";
import { useState } from 'react' 
import { teamsType, userNameIdType } from "../../typings";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";



export default function PlayerList({players, team}:{players?:userNameIdType[], team:teamsType}){
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [playersList, setPlayersList] = useState<userNameIdType[] | undefined>(players)
    return(
        <div className="flex flex-col w-full mx-auto max-w-2xl p-2 bg-white rounded">
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
            {playersList&&playersList.map((player)=>{
                return(
                    <div key={player.id} className="flex h-10 flex-row group items-center justify-between w-full p-1 rounded hover:bg-blue-300 transition-all">
                        <Link href={`/players/${player.id}`} className='link'>{player.username}</Link>
                            <div className="hidden invisible group-hover:flex group-hover:visible flex-row space-x-1 transition-all">
                                {player.id != team.cocaptain && 
                                    <button className="flex rounded bg-blue-600 hover:bg-blue-800 text-white py-1 px-2 space-x-1 font-medium transition-all" onClick={()=>makeCoCaptain(player.id)}>
                                        {loading && 
                                            <IoFootball className="text-2xl animate-spin"/>
                                        }
                                        {!loading && 
                                            <FaCrown className="text-2xl"/>
                                        }
                                        
                                        <label className="cursor-pointer">Co-Captain</label>
                                    </button>
                                }
                            {player.id != team.captain &&
                                <button className="flex rounded bg-red-600 hover:bg-red-800 text-white py-1 px-2 space-x-1 font-medium transition-all" onClick={()=>kickPlayer(player)}>
                                    {loading && 
                                        <IoFootball className="text-2xl animate-spin"/>
                                    }
                                    {!loading && 
                                        <IoBan className="text-2xl"/>
                                    }
                                    <label className="cursor-pointer">Kick</label>
                                </button>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
    
    async function makeCoCaptain (userId: string){
        setLoading(true)
        const res = await fetch(`${process.env.appPath}/api/makeCoCaptainApi`,{
            method: 'POST',
            body: JSON.stringify({userId})
        })
        const result = await res.json()
        if (res.status == 200){
            toast.success('Co-Captain succesfully changed')
            router.reload()
        }else{
            toast.error(result)
        }
        setLoading(false)
    }

    async function kickPlayer(player: userNameIdType) {
        setLoading(true)
        const res = await fetch(`${process.env.appPath}/api/kickPlayerFromTeamApi`,{
            method: 'POST',
            body: JSON.stringify({player})
        })
        const result = await res.json()
        if (res.status == 200){
            toast.success('Player succesfull kicked')
        }else{
            toast.error(result)
        }
        setLoading(false)
    }
}