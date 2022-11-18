import Lines from "../Lines";

export default function F313(){
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
                        <div className="flex h-full aspect-square items-center justify-center rounded-full bg-white">
                            LW
                        </div>
                        <div className="flex h-full aspect-square items-center justify-center rounded-full bg-white">
                            CF
                        </div>
                        <div className="flex h-full aspect-square items-center justify-center rounded-full bg-white">
                            RW
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 w-full items-center justify-around z-[2] flex-row">
                    {/* mid */}
                    <div className="flex flex-1 h-1/3 items-center justify-around">
                        <div className="flex h-full aspect-square items-center justify-center rounded-full bg-white">
                            CM
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 w-full items-end justify-around z-[2] flex-row">
                    {/* def */}
                    <div className="flex flex-1 h-1/3 items-center justify-around">
                        <div className="flex h-full aspect-square items-center justify-center rounded-full bg-white">
                            LB
                        </div>
                        <div className="flex h-full aspect-square items-center justify-center rounded-full bg-white">
                            CM
                        </div>
                        <div className="flex h-full aspect-square items-center justify-center rounded-full bg-white">
                            RB
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 w-full items-end justify-around z-[2] flex-row">
                    {/* gk */}
                    <div className="flex flex-1 h-1/3 items-center justify-around">
                        <div className="flex h-full aspect-square items-center justify-center rounded-full bg-white">
                            GK
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}