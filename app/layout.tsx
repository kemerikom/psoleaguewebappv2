import '../styles/globals.css'
import MainMenu from "./MainMenu"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body className='flex flex-col w-full'>
        <MainMenu/>
        {children} 
      </body>
    </html>
  )
}
