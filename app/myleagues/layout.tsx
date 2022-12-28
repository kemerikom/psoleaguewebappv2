import LeagueList from "./LeagueList"





export default async function RootLayout({children}:{children:React.ReactNode}){
    return(
        <main className='flex flex-row container p-3 space-x-2'>
            <div>
                <LeagueList/>
            </div>
            <div className="w-full rounded">
                {children}
            </div>

        </main>
    )
}