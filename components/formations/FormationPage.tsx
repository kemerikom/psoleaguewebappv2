import F313 from "./8/F313";
import F52 from "./8/F52";
import F421 from "./8/F421";
import F322 from './8/F322'
import F412 from "./8/F412";
import { userNameIdType } from "../../typings";

export default function FormationPage({color1,color2,fontcolor,roster,formation='313',players}:{color1:string,color2:string,fontcolor:string,roster?:number[],formation?:string,players:userNameIdType[]}){
    return(
        <div className="flex items-center justify-center w-full">
            {formation=="313"&&
                <F313 color1={color1} color2={color2} fontcolor={fontcolor} roster={roster?roster:[]} players={players}/>
            }
            {formation=="52"&&
                <F52 color1={color1} color2={color2} fontcolor={fontcolor} roster={roster?roster:[]} players={players}/>
            }
            {formation=="421"&&
                <F421 color1={color1} color2={color2} fontcolor={fontcolor} roster={roster?roster:[]} players={players}/>
            }
            {formation=="322"&&
                <F322 color1={color1} color2={color2} fontcolor={fontcolor} roster={roster?roster:[]} players={players}/>
            }
            {formation=="412"&&
                <F412 color1={color1} color2={color2} fontcolor={fontcolor} roster={roster?roster:[]} players={players}/>
            }
        </div>
    )
}