import Product from "./Product"

function ProductList(){
    const products = [8,2,2,2,2,2]
    return(
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide my-15 ">
            {
             products.map((_,i)=><Product key={i}/>)   
            }
        </div>
    )
}

export default ProductList