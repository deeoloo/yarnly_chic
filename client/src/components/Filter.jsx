import { useContext, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ApiContext } from "../context/ContextProvider";
import ProductCard from "./ProductCard";

const filterSections = [
  {
    key: "shop",
    title: "Shop",
    options: ["All", "Dresses", "Bottoms", "Tops", "Corsets", "Shirts", "Accessories", "Swimwear", "Kids"],
  },
  {
    key: "occasions",
    title: "Shop by Occasion",
    options: ["All", "casual", "winter", "everyday", "layering", "gift"],
  },
  {
    key: "bestsellers",
    title: "Bestsellers",
    options: [],
  },
];

function Filter({ onFilterChange }) {

    const [openSections, setOpenSections] = useState({});
    const value = useContext(ApiContext);
    const products = value.products;

    const toggleSection = (key) => {
        setOpenSections((prev) => ({
        ...prev,
        [key]: !prev[key],
        }));
    };

    const [selectedFilters, setSelectedFilters] = useState({
        shop: "All",
        occasions: "All",
    });

    const handleOptionClick = (sectionKey, option) => {
        setSelectedFilters((prev) => ({ ...prev, [sectionKey]: option }));
        onFilterChange(sectionKey, option);
    };


    return (
        <div className="sr-only md:not-sr-only min-w-[23vh] max-w-[25vh]">
        {filterSections.map((section) => (
            <div key={section.key} className="border-b-2 border-gray-200">
            
                <div
                    onClick={() => toggleSection(section.key)}
                    className="flex justify-between py-3 items-center cursor-pointer"
                >
                    <p>{section.title}</p>
                    {openSections[section.key] ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                {openSections[section.key] && section.key !== "bestsellers" && (
                    <div className="grid gap-2">
                    {section.options.map((opt) => (
                        <span
                        key={opt}
                        className={`cursor-pointer hover:text-purple-500 ${
                            selectedFilters[section.key] === opt ? "font-bold text-purple-500" : ""
                        }`}
                        onClick={() => handleOptionClick(section.key, opt)}
                        >
                        {opt}
                        </span>

                    ))}
                </div>
            )}

            
            {openSections[section.key] && section.key === "bestsellers" && (
                <div className="w-full grid gap-2">
                {products
                    .filter((prod) => prod.bestseller)
                    .map((prod) => (
                    <ProductCard
                        key={prod.id}
                        price={prod.price}
                        image={prod.image[0]}
                        name={prod.name}
                    />
                    ))}
                </div>
            )}
            </div>
        ))}
        </div>
    );
}

export default Filter;