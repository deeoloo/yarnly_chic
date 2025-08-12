import { useContext } from "react"
import { ApiContext } from "../context/ContextProvider"

function Halves(){
    const {assetUrl} = useContext(ApiContext)
    
    return(
        <div className="sm:flex my-25 max-w-full h-fit overflow-auto">
            <div className="w-full md:w-[50vw] h-full relative">
                <img src={assetUrl('/images/hero.jpg')} className="w-full h-4/4" alt="" />
                <div className="absolute w-fit bottom-20 left-1/3">
                    <h2 className="text-white text-xl">
                        BESTSELLER
                    </h2>
                    <div className="w-fit pt-2">
                        <p className="text-center text-white">
                            Shop Now
                        </p>
                        <div className="h-0.5 bg-white"></div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[50vw] border-l-1 h-full relative">
                <img src={assetUrl('/images/hero.jpg')} className="w-full h-4/4" alt="" />
                <div className="absolute w-fit bottom-20 left-1/3">
                    <h2 className="text-white text-xl">
                        TOPS
                    </h2>
                    <div className="w-fit pt-2">
                        <p className="text-center text-white">
                            Shop Now
                        </p>
                        <div className="h-0.5 bg-white"></div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Halves