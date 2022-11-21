import Trophy from "./Trophy"


export default function TrophyRoom({color1,color2}:{color1:string,color2:string}){
    return (
        <div className="flex flex-row items-start justify-start">
            <Trophy color1={color1} color2={color2}/>
        </div>
    )
}