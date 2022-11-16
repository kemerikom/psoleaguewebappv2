

export default function RootLayout({children}:{children:React.ReactNode}){
    return(
        <main className="flex justify-center container mx-auto p-3">
            {children}
        </main>
    )
}