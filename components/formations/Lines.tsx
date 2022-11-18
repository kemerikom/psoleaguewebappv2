

export default function Lines(){
    return(
        <>
        <div className="flex absolute w-[calc(100%-8px)] h-[calc(50%-4px)] border border-white top-1 left-1">
                    
            {/* top site*/}

        </div>
        <div className="flex absolute w-[calc(100%-8px)] h-[calc(50%-4px)] border border-white bottom-1 left-1">
            
            {/* bottom site*/}

        </div>
        <div className="flex absolute w-1/4 aspect-square rounded-full border border-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">

            {/* center circle */}

        </div>
        <div className="flex absolute w-1/4 aspect-sixbox top-1 left-1/2 -translate-x-1/2 border border-white">

            {/* top sixbox */}

        </div>
        <div className="flex absolute w-1/4 aspect-sixbox bottom-1 left-1/2 -translate-x-1/2 border border-white">

            {/* bottom sixbox */}

        </div>
        </>
    )
}