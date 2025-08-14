import { FaChevronRight } from "react-icons/fa"

function Breadcrumbs({items}){
    return(
        <nav className="flex max-w-[900px] mx-auto items-center text-md my-4 text-gray-500" aria-label="Breadcrumb">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                {index > 0 && <FaChevronRight className="mx-2 text-gray-400" size={12} />}
                {index < items.length - 1 ? (
                    <a
                    href={item.href}
                    className="hover:text-gray-700 transition-colors duration-200"
                    >
                    {item.label}
                    </a>
                ) : (
                    <span className="text-gray-900 font-medium">{item.label}</span>
                )}
                </div>
            ))}
        </nav>
    )
}

export default Breadcrumbs