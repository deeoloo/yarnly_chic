import { useContext, useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import ProductList from "./ProductList"
import { ApiContext } from "../context/ContextProvider"
import ProductCard from "./ProductCard"

function Filter(){
    const [shopOpen, setShopOpen] = useState(false)
    const [occassionOpen, setOccassionOpen] = useState(false)
    const [sellerOpen, setSellerOpen] = useState(false)
    const value = useContext(ApiContext)
    const products = value.products

    return(
        <div className="w-[20vh] p-4">
            <div className="border-b-2 border-gray-200">
                <div onClick={()=>setShopOpen(!shopOpen)} className="flex justify-between py-3 items-center">
                    <p className="">Shop</p>
                    {shopOpen?<FaChevronUp/>:<FaChevronDown/>}
                </div>
                {shopOpen && (

                    <div className="grid gap-2">
                        <span className="">All</span>
                        <span className="">Dresses</span>
                        <span className="">Bottoms</span>
                        <span className="">Tops</span>
                        <span className="">Corsets</span>
                        <span className="">Shirts</span>
                        <span className="">Accessories</span>
                        <span className="">Swimwear</span>
                    </div>
                )}
            </div>
            
            <div className="border-b-2 border-gray-200">
                <div onClick={()=>setOccassionOpen(!occassionOpen)} className="flex justify-between py-3 items-center ">
                    <p className="">Shop by Occassion</p>
                    {occassionOpen?<FaChevronUp/>:<FaChevronDown/>}
                </div>
                {occassionOpen && (
                    <div className="grid gap-2">
                        <span className="">All</span>
                        <span className="">Dresses</span>
                        <span className="">Bottoms</span>
                        <span className="">Tops</span>
                        <span className="">Corsets</span>
                        <span className="">Shirts</span>
                        <span className="">Accessories</span>
                        <span className="">Swimwear</span>
                    </div>
                )}
            </div>
            
            <div onClick={()=>setSellerOpen(!sellerOpen)} className="border-b-2 border-gray-200">
                <div className="flex justify-between py-3 items-center ">
                    <p className="">Bestsellers</p>
                    {sellerOpen?<FaChevronUp/>:<FaChevronDown/>}
                </div>
                {sellerOpen && (
                    <div className="w-full grid gap-2">
                        {products
                        .filter(prod => prod.bestseller)
                        .map(prod => (
                            <ProductCard
                                key={prod.id}
                                price={prod.price}
                                image={prod.images[0]}
                                name={prod.name}
                            />
                        ))}
                    </div>
                )}
            </div>
            
        </div>
    )
}

export default Filter