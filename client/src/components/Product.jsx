import { FaMinus, FaPlus } from "react-icons/fa";
import Breadcrumbs from "./Breadcrumb";
import { useLocation, Link} from "react-router-dom";
import { useContext, useState } from "react";
import { ApiContext } from "../context/ContextProvider";

function Product(){
    const {addToCart} = useContext(ApiContext)
    const location = useLocation();
    const {product} = location.state;

    const [formdata, setFormData] = useState({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        size:"",
        quantity: 1
    })
    
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: product.name, href: "" }, 
    ];

    function handleSubmit(e){
        
        addToCart(formdata)
        setFormData({
            id: product.id,
            name: product.name,
            price: product.price,
            images: product.images,
            size:"",
            quantity: 1
        })
    }
    
    return (
        <div className="w-full h-fit relative top-20 mb-20">
            <Breadcrumbs items={breadcrumbItems}/>
            <div className="flex flex-col lg:flex-row gap-4 max-w-[900px] mx-auto">
                <div className="w-1/2 mx-auto shadow-md">
                    <img 
                    className="w-full object-contain"
                    src={product.images[0]} 
                    alt={product.name} />
                </div>

                <div className="mx-auto w-1/2">
                    <h2 className="text-xl-purple-500 font-bold p-2">{product.name}</h2>
                    <p className="text-lg-purple-500 p-2  ">KSH {product.price}</p>

                    <div className="flex justify-between mt-3 py-1 px-2 items-center">
                        <span className="">Size: {formdata.size}</span>
                        <div className="w-fit">
                            <Link to="/sizechart"  className="font-bold"> Find your size</Link>
                            <div className="w-full h-0.5 rounded-full bg-black"></div>
                        </div>
                    </div>

                    <select 
                    className="w-full border mb-4 text-lg p-1 " 
                    name="size" 
                    id="size" 
                    value={formdata.size}
                    onChange={(e)=> setFormData({
                        ...formdata,
                        size: e.target.value
                    })}>
                        <option value=""></option>
                        {product.sizes.map((p)=>(<option value={p}>{p}</option>))}
                        
                       
                    </select>

                    <div className="">
                        <span className="">Quantity({} in cart)</span>
                        <div className="w-30 p-1 flex justify-between">
                            <button type="button" onClick={()=>setFormData({...formdata, quantity : formdata.quantity - 1})}>
                                <FaMinus className="text-black"/>
                            </button>
                            <span className="text-black font-bold">{formdata.quantity}</span>
                            <button type="button" onClick={()=>setFormData({...formdata, quantity : formdata.quantity + 1})}>
                                <FaPlus className="text-black"/>
                            </button>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="w-full bg-purple-800 text-white font-bold p-2 my-5">Add to Cart</button>
                    <div className="">
                        <h2 className="text-lg font-bold">Description</h2>
                        <p className="">{product.description}</p>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default Product