

export default function RootLayout({children}:{children:React.ReactNode}){
    return(
        <main className="container mx-auto p-3">
            {children}
        </main>
    )
}