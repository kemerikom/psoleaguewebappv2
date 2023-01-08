import {Dispatch} from 'react'
import { Dialog } from '@headlessui/react'

export default function MessageModal({isOpen,setIsOpen,message,success=true}:{isOpen:boolean,setIsOpen:Dispatch<boolean>,message?:string,success?:boolean}){
    return(
        <Dialog open={isOpen} onClose={(()=>setIsOpen(false))} className='flex p-2 rounded bg-red-300'>
            <label>{message} asdasd</label>
        </Dialog>
    )

}