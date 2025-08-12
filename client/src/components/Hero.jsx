import { useContext } from "react"
import { ApiContext } from "../context/ContextProvider"

function Hero() {
    const {assetUrl} = useContext(ApiContext)
    
    return(
        <div className="relative h-[80vh]">
            <img className="w-full h-full object-cover" src={assetUrl('/images/hero.jpg') || "https://placehold.co/1920x900"} alt="Collection photo" />
            <div className="absolute bottom-30 w-full text-white">
                <h2 className="text-center text-2xl z-10 p-5">
                    NAME OF COLLECTION
                </h2>
                <div className="w-fit m-auto">
                    <a href="" className="text-center ">
                        Order Now
                    </a>
                    <div className="h-0.5 bg-white"></div>
                </div>
            </div>
        </div>
    )
}

export default Hero