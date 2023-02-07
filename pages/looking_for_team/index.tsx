import { LookingForTeamType } from "../../typings"
import { lookingForTeamList } from "../../utils/mongodb/getLookingFor"
import LookingForTeam from "../../components/LookingForTeam"
import { useState } from "react"
import { IoFootball } from "react-icons/io5"
import { ToastContainer, toast } from "react-toastify"
import { toastSettings } from "../../utils/src/toastSettings"


export default function LookingForTeamPage({lookingForTeam}: {lookingForTeam: LookingForTeamType[]}){
    const [lfts, setLfts] = useState<LookingForTeamType[]>(lookingForTeam)
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <div className="flex flex-col p-2 items-center space-y-2">
            <ToastContainer theme="colored"/>
            <div className="flex flex-col space-y-2 max-w-md w-full mx-auto">
                {lfts.map((l) => {
                    return (
                        <LookingForTeam key={l._id.toString()} data={l}/>
                    )
                })}
            </div>
            <button className="btnPrimary" onClick={loadMore}>
                {loading && 
                <IoFootball className="text-2xl animate-spin"/>
                }
                {!loading && 
                'Load More'
                }
            </button>
        </div>
    )
    async function loadMore(){
        if (loading) return
        setLoading(true)
        const resLfts = await fetch(`${process.env.appPath}/api/getLookingForTeamApi`, {
            method: 'POST',
            body: JSON.stringify({
                page: page + 1
            })
        })
        const res = await resLfts.json()
        if (resLfts.status == 200) {
            setLfts(res)
            setPage(page + 1)
        }else{
            toast.error(res, toastSettings)
        }
        setLoading(false)
    }
}


export async function getStaticProps() {
    const lfts = await lookingForTeamList({page: 1})
    return {
        props:{lookingForTeam: JSON.parse(JSON.stringify(lfts))}
    }
}