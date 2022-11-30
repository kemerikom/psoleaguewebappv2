import Link from "next/link"
import {IoHeartDislike} from 'react-icons/io5'


export default function Page(){
    return(
        <div className='flex flex-col space-y-2 items-center justify-center'>
            <h1 className='text-center'>Following Players</h1>
            <hr/>
            <div className='flex flex-col max-w-lg w-full space-y-2 p-2 rounded hover:bg-blue-600 hover:text-white transition-all'>
                <div className="flex flex-row">
                    <Link href={'/'} className='flex flex-row justify-center items-center space-x-2 hover:underline'>
                        <div className="flex items-center justify-center w-16 aspect-square rounded-full mr-2">
                            <img src="/teamlogo.png" className="w-full aspect-square rounded-full object-contain"></img>
                        </div>
                        Recarmon [LSX]
                    </Link>
                    <div className="flex ml-auto items-center justify-center">
                        <IoHeartDislike className="text-2xl"/>
                    </div>
                </div>
            </div>
        </div>
    )
}