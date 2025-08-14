function ProductCard({
  name,
  image = "https://placehold.co/1920x900",
  price
}) {
  return (
    <div className="w-full h-fit max-w-xs  bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="aspect-square overflow-hidden">
        <img
          className="w-full object-cover"
          src={image}
          alt={name}
        />
      </div>
      <div className="p-3 text-center">
        <h2 className="text-base sm:text-lg font-semibold truncate">{name}</h2>
        <p className="text-sm sm:text-base text-gray-700">KSH {price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
