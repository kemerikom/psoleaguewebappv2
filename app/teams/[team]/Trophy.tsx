import {BsFillTrophyFill} from 'react-icons/bs'

export default function Trophy({color1,color2}:{color1:string,color2:string}) {
    return(
        <div id='box' className="flex flex-col p-2 rounded items-center m-2 transition-all">
            <style jsx>
                {
                    `
                    #box{
                        box-shadow:
                        inset 0 0 60px whitesmoke,
                        inset 20px 0 80px ${color1},
                        inset -20px 0 80px ${color2},
                        inset 20px 0 300px ${color1},
                        inset -20px 0 300px ${color2},
                        0 0 50px #fff,
                        -10px 0 80px ${color1},
                        10px 0 80px ${color2};
                        animation: animateGlow 5s ease infinite;
                    }

                    @keyframes animateGlow {
                        0% {
                            box-shadow:
                            inset 0 0 60px whitesmoke,
                            inset 20px 0 60px ${color1},
                            inset -20px 0 60px ${color2},
                            inset 20px 0 200px ${color1},
                            inset -20px 0 200px ${color2},
                            0 0 50px #fff,
                            -10px 0 80px ${color1},
                            10px 0 80px ${color2};
                        }
                        50% {
                            box-shadow:
                            inset 0 0 60px whitesmoke,
                            inset 20px 0 60px ${color2},
                            inset -20px 0 60px ${color1},
                            inset 20px 0 200px ${color2},
                            inset -20px 0 200px ${color1},
                            0 0 50px #fff,
                            -10px 0 80px ${color2},
                            10px 0 80px ${color1};
                        }
                        100% {
                            box-shadow:
                            inset 0 0 60px whitesmoke,
                            inset 20px 0 60px ${color1},
                            inset -20px 0 60px ${color2},
                            inset 20px 0 200px ${color1},
                            inset -20px 0 200px ${color2},
                            0 0 50px #fff,
                            -10px 0 80px ${color1},
                            10px 0 80px ${color2};
                        }
                    }
                    `
                }
            </style>
            <BsFillTrophyFill  className='text-9xl text-gold'/>
            <div className='flex m-2 p-2 rounded bg-white backdrop-blur-sm bg-opacity-40'>
                <h3 className='font-bold'>Türkiye 1. Lig Şampiyonu</h3>
            </div>
        </div>
    )
}