import { teamsType } from "../../../typings"

export default function TeamsPage({teams}:{teams:teamsType[]}){
    return(
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div className="flex items-center w-16 aspect-square rounded-full">
                    <img className="rounded-full" src='/teamlogo.png'></img>
                </div>
            </div>
        </div>
    )
}