import { transferType } from "../../typings";
import Link from "next/link";
import { BiTransferAlt } from "react-icons/bi";
import { IoPeopleCircle } from "react-icons/io5";

export default function Transfer({transfer}: {transfer: transferType}){
    const date= new Date(transfer.datetime).toLocaleString()
    return(
    <div className="flex flex-row group w-full items-center justify-center space-x-2 hover:bg-blue-600 hover:text-white text-black bg-white rounded transition-all p-2">
        <div className="flex flex-1 justify-end">
            {transfer.from?.id != 'free' && 
            <div className="flex w-16 h-16 aspect-square rounded-full items-center justify-center">
                {transfer.from?.logo && 
                    <img src={`${process.env.storagePath}/teamlogos/${transfer.from.logo}`} className='w-16 h-16 rounded-full object-contain'></img>
                }
                {!transfer.from?.logo && 
                    <div className="flex w-16 h-16 aspect-square group-hover:bg-blue-800 bg-blue-600 text-white rounded-full items-center justify-center">
                        <IoPeopleCircle className="text-4xl"/>
                    </div>
                }
            </div>
            }
            {transfer.from?.id == 'free' && 
            <div className="flex w-16 h-16 aspect-square rounded-full items-center justify-center">
                <div className="flex w-16 h-16 aspect-square group-hover:bg-blue-800 bg-blue-600 text-white rounded-full items-center justify-center">
                    Free
                </div>
            </div>
            }
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
            <BiTransferAlt className="text-lg"/>
            <Link href={`/players/${transfer.user.id}`}>{transfer.user.username}</Link>
        </div>
        <div className="flex flex-1 justify-start">
        {transfer.to?.id != 'free' && 
            <div className="flex w-16 h-16 aspect-square rounded-full items-center justify-center">
                {transfer.to?.logo && 
                    <img src={`${process.env.storagePath}/teamlogos/${transfer.to.logo}`} className='w-16 h-16 rounded-full object-contain'></img>
                }
                {!transfer.to?.logo && 
                    <div className="flex w-16 h-16 aspect-square group-hover:bg-blue-800 bg-blue-600 text-white rounded-full items-center justify-center">
                        <IoPeopleCircle className="text-4xl"/>
                    </div>
                }
            </div>
            }
            {transfer.to?.id == 'free' && 
            <div className="flex w-16 h-16 aspect-square rounded-full items-center justify-center">
                <div className="flex w-16 h-16 aspect-square group-hover:bg-blue-800 bg-blue-600 text-white rounded-full items-center justify-center">
                    Free
                </div>
            </div>
            }
        </div>
    </div>
    )
   
}