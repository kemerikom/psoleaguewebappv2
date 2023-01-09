import { playerType } from "../../typings"
import { getPlayerIds,getPlayer } from "../../utils/mongodb/getUsers"
import Head from "next/head"

export default function Player({data}:{data:playerType}){
    return(
        <div className="container mx-auto p-3">
            <Head>
                <meta property="og:type" content="website"></meta>
                <meta property="og:url"  content={`${process.env.appPath}/teams/${data._id.toString()}`}></meta>
                <meta property="og:title" content={`${data.username}`}></meta>
                <meta property="og:description" content={`Playing at ${data.mainpos} and ${data.secondpos}`}></meta>
                <meta property="og:image" content="https://prosoccerleague.vercel.app/teamlogo.png"></meta>
                <meta name="og:country-name" content={`${data.country}`}></meta>
                <meta property="og:type" content="game.achievement"></meta>
                <meta property="og:points" content="POINTS_FOR_ACHIEVEMENT"></meta>
            </Head>

        </div>
    )
}


export async function getStaticProps({params}:{params:{player:string}}){
    const resPlayer = await getPlayer({playerId:params.player})
    const player = JSON.parse(JSON.stringify(resPlayer))
    return{
        props:{data:player},
        revalidate:60
    }
}


export async function getStaticPaths() {
    const result = await getPlayerIds()
    const paths=result.map((r)=>{
        return{
            params:{player:r._id.toString()}
        }
    })
    return{
        paths,
        fallback:false
    }
}