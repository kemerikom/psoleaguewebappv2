import { userNameIdType } from "../../typings";
import Link from "next/link";

export default function PlayerList({players}: {players: userNameIdType[]}){
    return(
        <div className="flex flex-col w-full max-w-md bg-white p-2 rounded items-center justify-center">
            {players.map((player) => {
                return(
                    <Link key={player.id} className="link" href={`${process.env.appPath}/players/${player.id}`}>{player.username}</Link>
                )
            })}
        </div>

    )
}