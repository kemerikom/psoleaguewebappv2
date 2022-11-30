import Link from "next/link"

export default function SettingsList(){
    return(
        <div className='flex flex-col w-64 items-center p-2 mx-2 rounded bg-white backdrop-blur-sm bg-opacity-70 gap-y-2 overflow-y-auto flex-shrink-0'>
            <h1>Settings</h1>
            <hr/>
            <Link href={'/settings/account'} className={`bg-blue-600 w-full text-center p-2 rounded text-white hover:bg-blue-900 transition-all`}>Account Settings</Link>
            <Link href={'/settings/password'} className={`bg-blue-600 w-full text-center p-2 rounded text-white hover:bg-blue-900 transition-all`}>Change Password</Link>
            <Link href={'/settings/steam'} className={`bg-blue-600 w-full text-center p-2 rounded text-white hover:bg-blue-900 transition-all`}>Link Your Steam Account</Link>
            <Link href={'/settings/discord'} className={`bg-blue-600 w-full text-center p-2 rounded text-white hover:bg-blue-900 transition-all`}>Link Your Discord Account</Link>
            <Link href={'/settings/leagues'} className={`bg-blue-600 w-full text-center p-2 rounded text-white hover:bg-blue-900 transition-all`}>Following Leagues</Link>
            <Link href={'/settings/players'} className={`bg-blue-600 w-full text-center p-2 rounded text-white hover:bg-blue-900 transition-all`}>Following Players</Link>
        </div>
    )
}