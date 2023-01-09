import ReactCountryFlag from "react-country-flag"
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

export default function PlayerCard(){
    return(
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