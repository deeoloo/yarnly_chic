import { useContext } from "react";
import { ApiContext } from "../context/ContextProvider";
import ProductCard from "./ProductCard";

function ProductList() {
  const { products } = useContext(ApiContext);

  const displayProducts = products.slice(0, 8);

  return (
    <div className="flex w-full overflow-x-auto space-x-4 scrollbar-hide my-15 bg-purple-100 p-10">
      {displayProducts.map((prod, i) => (
        <div key={prod.id || i} className="flex-shrink-0 min-w-[220px]">
          <ProductCard
            image={prod.images[0]}
            name={prod.name}
            price={prod.price}
            product={prod}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
