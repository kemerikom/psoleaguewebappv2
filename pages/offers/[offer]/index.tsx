import { offerType } from "../../../typings"
import { getOfferById, getOfferIds } from "../../../utils/mongodb/getOffers"
import Link from "next/link"
import { IoArrowForward } from "react-icons/io5"
import { FaBan, FaRegCheckCircle } from 'react-icons/fa'

export default function Offer({offer}: {offer:offerType}){
    return(
        <div className="flex relative flex-col space-y-2 max-w-4xl w-full p-2 my-3 mx-auto bg-white backdrop-blur-sm bg-opacity-70 rounded items-center justify-center">
            <h1>
                Transfer Offer
            </h1>
            <hr/>
            {offer.rejectplayer && 
                <FaBan className="text-9xl absolute left-1/2 top-1/2 text-red-800 opacity-70 h-full -translate-y-1/2  -translate-x-1/2"/>
            }
            {offer.rejectteam && 
                <FaBan className="text-9xl absolute left-1/2 top-1/2 rotate-90 text-red-800 opacity-70 h-full -translate-y-1/2  -translate-x-1/2"/>
            }
            {offer.acceptplayer && offer.acceptteam && 
                <FaRegCheckCircle className="text-9xl absolute left-1/2 top-1/2 text-green-800 opacity-70 h-full -translate-y-1/2  -translate-x-1/2"/>
            }
            <div className="flex flex-row p-2 space-x-2 justify-center items-center">
                <Link href={`/teams/${offer.toteam?.id}`} className="link flex flex-col items-center">
                    <div className="flex w-32 h-32 aspect-square rounded-full">
                        <img src="/teamlogo.png" className="w-32 h-32 aspect-square rounded-full"></img>
                    </div>
                    <h2 className="text-xl cursor-pointer">{offer.toteam?.teamname || 'FREE'}</h2>
                </Link>
                <IoArrowForward className="text-3xl"/> 
                <div className="flex flex-col items-center">
                    <Link href={`/players/${offer.toplayer.id}`} className="link flex flex-col w-16 h-16 rounded-full items-center justify-center">
                        <img src={offer.toplayer.avatar} className="object-contain object-center rounded-full"></img>
                        {offer.toplayer.username}
                    </Link>
                </div>
                <IoArrowForward className="text-3xl"/> 
                <Link href={`/teams/${offer.toteam?.id}`} className="link flex flex-col items-center">
                    <div className="flex w-32 h-32 aspect-square rounded-full">
                        <img src="/teamlogo.png" className="w-32 h-32 aspect-square rounded-full"></img>
                    </div>
                    <h2 className="text-xl cursor-pointer">{offer.fromteam.teamname}</h2>
                </Link>
            </div>
        </div>
    )
}


export async function getStaticProps({params}:{params: {offer: string}}) {
    const resOffer = await getOfferById({offerId:params.offer})
    if (resOffer) {
        const offer = JSON.parse(JSON.stringify(resOffer))
        return{
            props: {
                offer
            }
        }
    }else{
        return{
            notFound: true
        }
    }

}


export async function getStaticPaths() {
    const resOffers = await getOfferIds()
    const offers = JSON.parse(JSON.stringify(resOffers))
    const paths = offers.map((offer:any) => {
        return {
            params: {offer: offer.id}
        }
    })
    return{
        paths,
        fallback: 'blocking'
    }
}