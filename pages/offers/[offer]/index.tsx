import { offerType } from "../../../typings"
import { getOfferById, getOfferIds } from "../../../utils/mongodb/getOffers"
import Link from "next/link"
import { IoArrowForward } from "react-icons/io5"
import { FaBan, FaRegCheckCircle } from 'react-icons/fa'
import OfferPage from "../../../components/offers/OfferPage"

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
            <OfferPage offer={offer}/>
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
            },
            revalidate: 10
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
            params: {offer: offer.id},
            
        }
    })
    return{
        paths,
        fallback: 'blocking'
    }
}