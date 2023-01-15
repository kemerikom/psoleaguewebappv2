import { offerType } from "../../typings";
import Link from "next/link";
import { IoArrowForward} from 'react-icons/io5'


export default function OfferPage({offer}: {offer:offerType}){
    return(
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
    )

}