import { useContext } from "react"
import { ApiContext } from "../context/ContextProvider"
import ProductCard from "./ProductCard"

function ProductList(){
    const value = useContext(ApiContext)
    const products = value.products
    return(
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide my-15 bg-purple-100 p-10">
            {
             products.map((prod,i)=><ProductCard 
                                    key={prod.id || i}
                                    image={prod.images[0]}
                                    name={prod.name}
                                    price={prod.price}/>)   
            }
        </div>
    )
}

export default ProductList