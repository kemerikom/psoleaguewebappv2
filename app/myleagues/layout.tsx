import LeagueList from "./LeagueList"


export default function RootLayout({children}:{children:React.ReactNode}){
    return(
        <main className='flex flex-row container p-3 items-start'>
            <LeagueList/>
            {children}
        </main>
    )
}