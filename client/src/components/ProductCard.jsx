function ProductCard({name, image="https://placehold.co/1920x900", price}){
    return(
        <div className="min-w-[70vw] max-w-[80vw] md:min-w-120 md:max-w-130 ">
            <img className="w-full object-contain h-100" src={image} alt="product image" />
            <div className="w-full">
                <h2 className="text-center text-lg">{name}</h2>
                <p className="text-center text-lg">KSH {price}</p>
            </div>
        </div>
    )
}

export default ProductCard