import { Disclosure } from '@headlessui/react'
import Link from 'next/link'


export default function StatsPlayer({home}: {home: boolean}) {
    return(
        <Disclosure>
            <Disclosure.Button className={`${home? 'bg-red-600 hover:bg-red-800': 'bg-blue-600 hover:bg-blue-800'} rounded p-2 text-white transition-all`}>
                <Link href={`/`} className='link'>Sharkman</Link>
            </Disclosure.Button>
            <Disclosure.Panel className={`${home? 'bg-red-800 hover:bg-red-900': 'bg-blue-800 hover:blue-900'} flex flex-col items-center  text-white p-2 rounded transition-all`}>
                <label>Score: 540</label>
                <label>Assist: 3</label>
                <label>Passes: 12</label>
                <label>Goals: 0</label>
                <label>TKLs/INTs: 20</label>
                <label>Catches: 0</label>
                <label>Saves: 0</label>
            </Disclosure.Panel>
        </Disclosure>
    )
}