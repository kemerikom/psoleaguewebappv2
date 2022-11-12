import '../../../styles/globals.css'


export default function RootLayout({children}:{children:React.ReactNode}){

    return(
        <main className='flex flex-1 bg-blue-300 w-full'>
            {children}
        </main>
    )
}