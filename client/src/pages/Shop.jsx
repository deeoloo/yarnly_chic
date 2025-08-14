import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../context/ContextProvider";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";

function Shop() {
  const { products } = useContext(ApiContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilterChange = (sectionKey, value) => {
    if (value === "All") {
      setFilteredProducts(products);
    } else if (sectionKey === "shop") {
      setFilteredProducts(products.filter((p) => p.category === value));
    } else if (sectionKey === "occasion") {
      setFilteredProducts(products.filter((p) => p.occasion.includes( value )));
    }
  };

  return (
    <div className="flex flex-row min-h-screen py-20">
      
      <Filter onFilterChange={handleFilterChange} />

      <div className="flex-grow p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              name={prod.name}
              price={prod.price}
              image={prod.images[0]}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
}

export default Shop;
