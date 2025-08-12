function Product(){
    return(
        <div className="min-w-[70vw] md:min-w-120 bg">
            <img className="w-full" src="https://placehold.co/300x400" alt="product image" />
            <div className="w-full">
                <h2 className="text-center text-xl">Name</h2>
                <p className="text-center text-lg">Price</p>
            </div>
        </div>
    )
}

export default Product