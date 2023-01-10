import { medalType } from "../../typings";
import Medal from "./Medal";


export default function MedalRoom({medals}:{medals:medalType[]}){
    return(
        <div className="flex flex-row items-start justify-start">
            {medals.map((medal:medalType)=>{
                return(
                    <Medal key={medal._id} color1={medal.color1} color2={medal.color2} title={medal.title}/>
                )
            })}
        </div>
    )
}