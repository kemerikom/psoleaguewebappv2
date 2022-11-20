import F313 from "./8/F313";
import F52 from "./8/F52";
import F421 from "./8/F421";
import F322 from './8/F322'
import F412 from "./8/F412";

export default function FormationPage({color1,color2,fontcolor,roster,formation}:{color1:string,color2:string,fontcolor:string,roster?:string[],formation?:string}){
    return(
        <div className="flex items-center justify-center w-full">
            {formation=="313"||!formation&&
                <F313 color1={color1} color2={color2} fontcolor={fontcolor} roster={roster?roster:[]}/>
            }
            {formation=="52"&&
                <F52 color1={color1} color2={color2} fontcolor={fontcolor} roster={roster?roster:[]}/>
            }
            {formation=="421"&&
                <F421 color1={color1} color2={color2} fontcolor={fontcolor} roster={roster?roster:[]}/>
            }
            {formation=="322"&&
                <F322 color1={color1} color2={color2} fontcolor={fontcolor} roster={roster?roster:[]}/>

            }
            {formation=="412"&&
                <F412 color1={color1} color2={color2} fontcolor={fontcolor} roster={roster?roster:[]}/>
            }
        </div>
    )

}