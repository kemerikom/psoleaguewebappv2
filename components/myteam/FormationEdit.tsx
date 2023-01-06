import { teamsType, userNameIdType } from "../../typings";
import FormationPage from "../formations/FormationPage";


export default function FormationEdit({data}:{data:teamsType}){
    return(
        <div className='flex flex-col w-full bg-white rounded'>
            <FormationPage color1={data.color1} color2={data.color2} fontcolor={data.fontcolor} formation={data.formation} roster={data.roster} players={data.players}/>
        </div>
    )
}