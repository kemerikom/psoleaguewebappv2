'use client'
import Lines from "../Lines"
import PlayerIcon from "../../PlayerIcon"
import { userNameIdType } from "../../../typings"

export default function F52({color1,color2,fontcolor,roster,players}:{color1:string,color2:string,fontcolor:string,roster:number[],players:userNameIdType[]}){
    return(
        <div className="flex w-full p-2">
            <div className="flex flex-col w-full bg-green-900 relative aspect-stadium rounded p-2">
                <Lines/>
                <div className="flex flex-1 w-full items-start justify-around z-[2] flex-row">
                    
                    {/* opponent gk */}

                </div>
                <div className="flex flex-1 w-full items-start justify-around z-[2] flex-row">
                    
                    {/* forwards */}
                    <div className="flex flex-1 h-1/3 items-center justify-around">
                        <PlayerIcon
                        color1={color1}
                        color2={color2}
                        fontcolor={fontcolor}
                        position={'LW'}
                        player={players[roster[6]]}
                        />
                        <PlayerIcon
                        color1={color1}
                        color2={color2}
                        fontcolor={fontcolor}
                        position={'RW'}
                        player={players[roster[7]]}
                        />
                    </div>
                </div>
                <div className="flex flex-1 w-full items-start justify-around z-[2] flex-row">
                    
                    {/* mid */}
                    <div className="flex flex-1 h-1/3 items-center justify-around">
                        
                    </div>
                </div>
                <div className="flex flex-1 w-full items-start justify-around z-[2] flex-row">
                    
                    {/* def */}
                    <div className="flex flex-1 h-1/3 items-center justify-around">
                        <PlayerIcon
                        color1={color1}
                        color2={color2}
                        fontcolor={fontcolor}
                        position={'LB'}
                        player={players[roster[1]]}
                        />
                        <PlayerIcon
                        color1={color1}
                        color2={color2}
                        fontcolor={fontcolor}
                        position={'LCB'}
                        player={players[roster[2]]}
                        />
                        <PlayerIcon
                        color1={color1}
                        color2={color2}
                        fontcolor={fontcolor}
                        position={'CB'}
                        player={players[roster[3]]}
                        />
                        <PlayerIcon
                        color1={color1}
                        color2={color2}
                        fontcolor={fontcolor}
                        position={'RCB'}
                        player={players[roster[4]]}
                        />
                        <PlayerIcon
                        color1={color1}
                        color2={color2}
                        fontcolor={fontcolor}
                        position={'RB'}
                        player={players[roster[5]]}
                        />
                    </div>
                </div>
                <div className="flex flex-1 w-full items-start justify-around z-[2] flex-row">
                    {/* gk */}
                    <div className="flex flex-1 h-1/3 items-center mt-auto justify-around">
                        <PlayerIcon
                        color1={color1}
                        color2={color2}
                        fontcolor={fontcolor}
                        position={'GK'}
                        player={players[roster[0]]}
                        />          
                    </div>
                </div>
            </div>
        </div>
    )

}