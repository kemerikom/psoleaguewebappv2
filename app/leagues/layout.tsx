import '../../styles/globals.css'
import LeagueList from "./LeagueList";

export default function RootLayout({children}:{children:React.ReactNode}){

    return(
        <main className='flex flex-row p-3 container items-start justify-center'>
            <div className='flex'>
                <LeagueList/>
            </div>
            <div className='flex flex-1 rounded items-start justify-start'>
                {children}
            </div>
        </main>
    )
}