import { playerType } from "../../typings"
import { getPlayerIds,getPlayer } from "../../utils/mongodb/getUsers"
import Head from "next/head"
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import ReactCountryFlag from "react-country-flag";
import { getPlayerCard } from "../../utils/firebase/getImages";


export default function Player({data}:{data:playerType}){
    return(
        <div className="container mx-auto p-3">
            <Head>
                <meta property="og:type" content="website"></meta>
                <meta property="og:url"  content={`${process.env.appPath}/teams/${data._id.toString()}`}></meta>
                <meta property="og:title" content={`${data.username}`}></meta>
                <meta property="og:image" content={`https://storage.googleapis.com/psoleaguev2.appspot.com/players/cards/${data.card}`}></meta>
                <meta property="og:image:width" content="1024"></meta>
                <meta property="og:image:height" content="288"></meta>
            </Head>
            <div id="card" className="flex flex-row items-start justify-start bg-blue-600 p-2 rounded text-white max-w-lg w-full space-x-2">
                <div className="flex w-32 h-32 rounded-full aspect-square">
                    <img src="/teamlogo.png" className="w-full h-full object-contain rounded-full"></img>
                </div>
                <div className="flex flex-col space-y-2">
                    <h2 className=" text-xl font-medium">Sharkman [LSX]</h2>
                    <ReactCountryFlag className="text-xl" countryCode={'TR'} svg title={'TR'} style={{width:'30px'}}/>
                    <div className="flex flex-row space-x-1">
                        <div className="flex w-10 h-10 aspect-square bg-green-800 rounded-full items-center justify-center text-xl">
                            LB
                        </div>
                        <div className="flex w-10 h-10 aspect-square bg-green-800 rounded-full items-center justify-center text-xl">
                            RB
                        </div>
                    </div>

                </div>
            </div>
            <button onClick={cardClick}>SS</button>
        </div>
    )
    function cardClick(){
        const card = document.getElementById('card')
        htmlToImage.toPng(card||document.createElement('div'))
        .then((data)=>{
            let img = new Image()
            img.src=data
            console.log(data)
        })
    }
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