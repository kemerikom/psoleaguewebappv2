


export default function Page(){
    return(
        <div className='flex flex-col space-y-2 items-center justify-center'>
            <h1 className='text-center'>Account Settings</h1>
            <hr/>
            <div className='flex flex-col max-w-lg w-full space-y-2'>
                <input className="inputSignUp" minLength={6} maxLength={30} placeholder="Current password" type={'password'}></input>
                <input className="inputSignUp" minLength={6} maxLength={30} placeholder="New password" type={'password'}></input>
                <button className='ml-auto bg-blue-600 text-white py-2 px-4 rounded'>Save</button>
            </div>
        </div>
    )
}