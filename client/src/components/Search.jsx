import { useContext, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { ApiContext } from "../context/ContextProvider"
import { X } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

function Search(){
    const {products} = useContext(ApiContext)
    const [term, setTerm] = useState("")
    const location = useLocation()
    const nav = useNavigate()
    console.log(location)
    const searched = products.filter((prod)=>{
        if (prod.name.toLowerCase().includes(term) && term){
            return prod
        }
    })
    return(
        <div className="w-full h-full">
            <div className="w-full flex flex-row-reverse items-center gap-3 relative">
                <X onClick={()=>{nav(location.state.location.pathname)}} className="md:absolute top-5 right-5"/>
                <div className="md:w-[80vh] mx-auto w-full mt-0 p-1 md:rounded-2xl  md:drop-shadow-lg shadow flex space-x-3 items-center md:mt-20 px-3">
                    <input type="search" name="search" value={term} onChange={(e)=>setTerm(e.target.value)} id="search" className="w-full text-lg focus:outline-0 p-1" />
                    <FaSearch className="w-fit"/>
                </div>
            </div>
            
            <div className="flex flex-col md:w-[80vh] mx-auto w-full">
                {
                    searched.map((product)=>(
                        <div className="flex justify-around max-h-[300px] items-center mt-5 space-y-4 shadow-md rounded-xl">
                            
                            <div className="max-w-1/3 max-h-[200px]">
                                <Link state={{product}} to={`/product/${product.name}`}>
                                    <img src={product.images[0]} alt={product.name} className="object-cover h-[200px]"/>
                               </Link>  
                            </div>
                            
                                <div className="max-w-1/3">
                                    <Link state={{product}} to={`/product/${product.name}`}>
                                        <h2 className="">{product.name}</h2>
                                    </Link>
                                    <p className="">KSH {product.price}</p>
                                </div>
                            
                        </div>      
                    ))
                }
            </div>
        </div>
    )
}

export default Search