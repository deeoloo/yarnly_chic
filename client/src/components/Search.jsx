import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ApiContext } from "../context/ContextProvider";
import { X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Search() {
  const { products = [] } = useContext(ApiContext);
  const [term, setTerm] = useState("");
  const location = useLocation();
  const nav = useNavigate();

  const query = term.trim().toLowerCase();
  const results = query
    ? products.filter((p) => (p.name || "").toLowerCase().includes(query))
    : products;

  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-row-reverse items-center gap-3 relative">
        <X
          onClick={() => {
            
            if (location.key !== "default") nav(-1);
            else nav("/");
          }}
          className="md:absolute top-5 right-5 cursor-pointer"
        />
        <div className="md:w-[80vh] mx-auto w-full p-1 md:rounded-2xl md:drop-shadow-lg shadow flex space-x-3 items-center md:mt-20 px-3">
          <input
            type="search"
            name="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            id="search"
            className="w-full text-lg p-2 border rounded bg-white text-gray-900 focus:outline-none"
            placeholder="Search products…"
          />
          <FaSearch className="w-fit" />
        </div>
      </div>

      <div className="md:w-[80vh] mx-auto w-full mt-4">
        {results.length === 0 ? (
          <div className="text-center py-10 text-sm text-gray-500">
            No products match “{term}”.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {results.map((product) => (
              <div
                key={product.id || product.name}
                className="flex justify-around max-h-[300px] items-center shadow-md rounded-xl p-3"
              >
                <div className="max-w-1/3 max-h-[200px]">
                  <Link state={{ product }} to={`/product/${product.name}`}>
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="object-cover h-[200px]"
                    />
                  </Link>
                </div>
                <div className="max-w-1/3">
                  <Link state={{ product }} to={`/product/${product.name}`}>
                    <h2 className="font-medium">{product.name}</h2>
                  </Link>
                  <p>KSH {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
