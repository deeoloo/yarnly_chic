import { Link } from "react-router-dom";

function ProductCard({
  name,
  image = "https://placehold.co/1920x900",
  price,
  product
}) {
    
    return (
        <div className="w-full h-fit max-w-xs bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        
            <Link state={{product}} to={`/product/${name}`} className="aspect-square overflow-hidden block">
                <img
                className="w-full object-cover"
                src={image}
                alt={name}
                />
            </Link>

            <div className="p-3 text-center">
                <Link state={{product}} to={`/product/${name}`}>
                    <h2 className="text-base sm:text-lg font-semibold truncate hover:underline">
                        {name}
                    </h2>
                </Link>
                <p className="text-sm sm:text-base text-purple-500">KSH {price}</p>
            </div>
        </div>
    );
}

export default ProductCard;
