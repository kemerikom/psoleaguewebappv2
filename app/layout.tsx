
import '../styles/globals.css'
import MainMenu from "./MainMenu"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html>
      <head></head>
      <body>
        <MainMenu/>
        {children}        
      </body>
    </html>
  )
}
