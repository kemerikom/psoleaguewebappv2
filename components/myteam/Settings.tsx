import { teamsType } from "../../typings";
import { useState, useEffect } from 'react'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { Dialog } from '@headlessui/react'
import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoFootball, IoPeopleCircle } from "react-icons/io5";
import { useRouter } from "next/router";


export default function Settings({data}: {data:teamsType}){
    const router = useRouter()
    const [teamName, setTeamName] = useState<string>(data.name)
    const [shortName, setShortName] = useState<string>(data.shortname)
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [newLogo, setNewLogo] = useState<any>('')
    const [newLogoPreview, setNewLogoPreview] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(()=>{
        try {
            const objectUrl = URL.createObjectURL(newLogo)
            setNewLogoPreview(objectUrl)
        } catch (error) {
            
        }

    }, [newLogo])
    return(
        <div className='flex flex-row max-w-2xl mx-auto w-full bg-white rounded'>
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            className={'z-50'}
            />
            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                <Dialog.Panel className={'flex flex-col space-y-2 absolute items-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-2 rounded shadow-md shadow-black'}>
                    <Dialog.Title className="text-xl font-medium">
                        Update Team Logo
                    </Dialog.Title>
                    <hr/>
                    <div className="flex w-32 h-32 relative">
                        <div className="flex relative w-32 h-32 ">
                            <img src={newLogoPreview} id='newLogoImg' className='flex w-32 h-32 object-cover'></img>
                            <div className="absolute top-0 left-0 w-32 h-32 bg-black bg-opacity-50">

                            </div>
                        </div>
                        <img src={newLogoPreview} className='flex absolute top-0 left-0 w-32 h-32 rounded-full object-cover'></img>
                    </div>
                    <input type={'file'} onChange={(e: any) => setNewLogo(e.target.files[0])}/>
                    <hr/>
                    <div className="flex w-full flex-wrap items-center justify-between">
                        <button className="btnPrimary" onClick={upload}>
                            {loading && 
                                <IoFootball className="text-xl animate-spin"/>
                            }
                            {!loading &&
                                'Upload'
                            }
                        </button>
                        <button className="btnSecondary" onClick={(() => setShowDialog(false))}>Cancel</button>
                    </div>
                </Dialog.Panel>
            </Dialog>

            <div className="flex flex-col w-full mx-auto p-2 space-y-2 items-center">
                <div className="flex group relative w-32 h-32 rounded-full">
                    {data.logo && 
                        <img src={`${process.env.storagePath}/teamlogos/${data.logo}`} className="w-full h-full rounded-full"></img>
                    }
                    {!data.logo &&
                        <div className="flex w-32 h-32 items-center justify-center rounded-full"
                        style={{backgroundColor: data.color1}}
                        >
                            <IoPeopleCircle className="text-9xl"
                            style={{color: data.color2}}
                            />
                        </div>
                    }
                    <div className="absolute flex group-hover:bg-opacity-50 top-0 left-0 w-full h-full rounded-full bg-black bg-opacity-0 transition-all cursor-pointer items-center justify-center" onClick={() => setShowDialog(true)}>
                        <MdAddPhotoAlternate className="text-white text-4xl hidden invisible group-hover:flex group-hover:visible transition-all"/>
                    </div>
                </div>
                <input className="w-full border-b-gray-300 border-b" minLength={3} maxLength={20} defaultValue={teamName} onChange={((e) => setTeamName(e.target.value))} placeholder="Team Name"/>
                <input className="w-full border-b-gray-300 border-b" minLength={3} maxLength={4} defaultValue={shortName} onChange={((e) => setShortName(e.target.value))} placeholder="Team Name"/>
            </div>
        </div>
    )
    async function upload() {
        setLoading(true)
        const newLogoImg = document.getElementById('newLogoImg')
        if (newLogoImg) {
            htmlToImage.toPng(newLogoImg)
            .then(async function (dataUrl) {
                const res = await fetch(`${process.env.appPath}/api/uploadTeamLogoApi`,{
                    method: 'POST',
                    body: JSON.stringify({
                        image: dataUrl,
                        taemId: data._id.toString()
                    })
                })
                const result = await res.json()
                if(res.status == 200){
                    toast.success('Team logo succesfully updated')
                    setShowDialog(false)
                    router.reload()

                }else{
                    toast.error(result)
                }
            })
            .catch(() => {
                toast.error('Invalid image')
            })
        }
        setLoading(false)
    }
}