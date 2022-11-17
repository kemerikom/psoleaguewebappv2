

export default function RootLayout({children}:{children:React.ReactNode}){
    return(
        <main className="items-center container mx-auto p-3">
            {children}
        </main>
    )
}