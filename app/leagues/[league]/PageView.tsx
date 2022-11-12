'use client'
import { leagueName } from "../../../typings"
import { Tab } from '@headlessui/react'


export default function PageView({data}:{data:leagueName}){
    return(
        <div className="flex w-full p-2 rounded">
            <Tab.Group as={'div'}>
                <Tab.List as={'div'} className='flex flex-row bg-white p-1 rounded space-x-2'>
                    <Tab as='div' className={'outline-none'}>
                        {({selected})=>(
                            <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} transition-all p-2 rounded`}>Previous Seasons</button>
                        )}
                    </Tab>
                    <Tab as='div' className={'outline-none'}>
                        {({selected})=>(
                            <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} transition-all p-2 rounded`}>Current Season</button>
                        )}
                    </Tab>
                    <Tab as='div' className={'outline-none'}>
                        {({selected})=>(
                            <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} transition-all p-2 rounded`}>Teams</button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        Önceki sezonlar
                    </Tab.Panel>
                    <Tab.Panel>
                        Şimdiki sezon
                    </Tab.Panel>
                    <Tab.Panel>
                        takımlar
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}