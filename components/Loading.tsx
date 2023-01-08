import { IoFootball } from 'react-icons/io5'


export default function Loading(){
    return(
        <div  className='flex items-center justify-center'>
            <div className='flex aspect-square rounded items-center justify-center text-white'>
                <IoFootball className='text-2xl animate-spin'/>
            </div>
        </div>
    )
}