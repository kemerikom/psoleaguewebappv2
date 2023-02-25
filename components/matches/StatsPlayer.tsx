import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import { playerMatchStats } from '../../typings'


export default function StatsPlayer({home, stats}: {home: boolean, stats: playerMatchStats}) {
    return(
        <Disclosure>
            <Disclosure.Button className={`${home? 'bg-red-600 hover:bg-red-800': 'bg-blue-600 hover:bg-blue-800'} rounded p-2 text-white transition-all`}>
                <Link href={`/players/${stats.id}`} className='link'>{stats.username}</Link>
            </Disclosure.Button>
            <Disclosure.Panel className={`${home? 'bg-red-800 hover:bg-red-900': 'bg-blue-800 hover:blue-900'} flex flex-col items-center  text-white p-2 rounded transition-all`}>
                <label>Score: {stats.score}</label>
                <label>Assist: {stats.assists}</label>
                <label>Passes: {stats.passes}</label>
                <label>Goals: {stats.goals}</label>
                <label>TKLs/INTs: {stats.tkls}</label>
                <label>Catches: {stats.catches}</label>
                <label>Saves: {stats.saves}</label>
            </Disclosure.Panel>
        </Disclosure>
    )
}