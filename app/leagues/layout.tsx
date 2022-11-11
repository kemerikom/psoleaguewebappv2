import '../../styles/globals.css'
import LeagueList from "./LeagueList";


export default function RootLayout({children}:{children:React.ReactNode}){

    return(
        <main>
            {/* @ts-ignore */}
            <LeagueList/>
            {children}
        </main>
    )
}