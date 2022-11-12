'use client'
import { leagueName } from "../../../typings"
import { Tab } from '@headlessui/react'
import { Disclosure } from '@headlessui/react'
import {IoChevronDownOutline} from 'react-icons/io5'


export default function PageView({data}:{data:leagueName}){
    return(
        <div className="flex w-full p-2 rounded">
            <Tab.Group as={'div'} className='flex flex-col space-y-2'>
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
                    <Tab.Panel as='div' className={'flex flex-col bg-white rounded p-2'}>
                        <Disclosure as='div' className={'w-full'}>
                            {({open})=>(
                                <div className="flex flex-col w-full space-y-2">
                                    <Disclosure.Button as='button' className={`${open?'bg-blue-600 text-white':'bg-blue-100 text-black'} flex flex-row items-center justify-between w-full p-1 rounded transition-all outline-none`}>
                                        2020-2021 Sezonu
                                        <IoChevronDownOutline className={`text-2xl ${open?'rotate-180':'rotate-0'} transition-all`}></IoChevronDownOutline>
                                    </Disclosure.Button>
                                    <Disclosure.Panel as='div' className={`flex bg-blue-100 p-1 rounded transition-all`}>
                                        Sezon bilgisi
                                    </Disclosure.Panel>
                                </div>
                            )}
                        </Disclosure>
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