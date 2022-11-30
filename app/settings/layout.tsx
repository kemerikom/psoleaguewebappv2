import SettingsList from "./SettingsList";
import Header from "./Header";




export default function Layout({children}:{children:React.ReactNode}){

    return(
        <main className='flex flex-row container p-3 items-start'>
            <SettingsList/>
            <div className='flex w-full flex-col'>
                <Header/>
                <div className="p-2 bg-white backdrop-blur-sm bg-opacity-70 rounded my-2">
                    {children}
                </div>

            </div>
        </main>
    )
}