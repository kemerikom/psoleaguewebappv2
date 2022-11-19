import F313 from "./8/F313";

export default function FormationPage({color1,color2,fontcolor,roster}:{color1:string,color2:string,fontcolor:string,roster?:string[]}){
    return(
        <div className="flex items-center justify-center w-full">
            <F313 color1={color1} color2={color2} fontcolor={fontcolor} roster={roster?roster:[]}/>
        </div>
    )
}