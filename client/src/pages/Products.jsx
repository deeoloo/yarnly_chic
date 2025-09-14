import { useContext, useState } from "react"
import { ApiContext } from "../context/ContextProvider"
import Modal from "../components/Modal"

function Products(){
    const {products} = useContext(ApiContext)
    const [open, setOpen] = useState(false)
    const [modalType, setModalType] = useState("") 
    const [selectedProduct, setSelectedProduct] = useState(null)
    
    const handleOpen = (type, product) => {
        setModalType(type)
        setSelectedProduct(product)
        setOpen(true)
    }
    return(
        <div className="">
            <div className="m-5 bg-purple-50 rounded-2xl p-2">
                <div className="flex justify-between items-center m-3">
                    <h2 className="text-2xl font-bold">Products</h2>
                    <button
                    type="button"
                    onClick={() => handleOpen("add", null)}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600"
                    >
                        + Add Product   
                    </button>  
                </div>

                <div className="">
                    {
                    <>
                        <div className="hidden md:block">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-purple-200">
                                        <th className="p-2">#</th>
                                        <th className="p-2">Image</th>
                                        <th className="p-2">Name</th>
                                        <th className="p-2">Category</th>
                                        <th className="p-2">Price</th>
                                        <th className="p-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {products.map((p, i) => (
                                    <tr key={p.id} className="border-b">
                                        <td className="p-2">{i + 1}</td>
                                        <td className="p-2">
                                            <img
                                            src={p.images[0]}
                                            alt={p.name}
                                            className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="p-2">{p.name}</td>
                                        <td className="p-2">{p.category}</td>
                                        <td className="p-2">Ksh {p.price}</td>
                                        <td className="p-2 my-4 flex gap-2">
                                            <button
                                            type="button"
                                            onClick={() => handleOpen("view", p)}
                                            className="px-3 py-1 rounded bg-purple-100"
                                            >
                                            View
                                            </button>
                                            <button
                                            type="button"
                                            onClick={() => handleOpen("edit", p)}
                                            className="px-3 py-1 rounded bg-purple-300"
                                            >
                                            Edit
                                            </button>
                                            <button
                                            type="button"
                                            onClick={() => handleOpen("delete", p)}
                                            className="px-3 py-1 rounded bg-purple-500 text-white"
                                            >
                                            Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="md:hidden flex flex-col gap-4">
                        {products.map((p) => (
                            <div
                            key={p.id}
                            className="shadow-md p-3 rounded-lg bg-white flex flex-col gap-2"
                            >
                                <img
                                    src={p.images[0]}
                                    alt={p.name}
                                    className="w-full h-100 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-bold">{p.name}</h3>
                                    <p className="text-sm text-gray-600">{p.category}</p>
                                    <p className="font-semibold">Ksh {p.price}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                    type="button"
                                    onClick={() => handleOpen("view", p)}
                                    className="flex-1 px-3 py-1 rounded bg-purple-100"
                                    >
                                        View
                                    </button>
                                    <button
                                    type="button"
                                    onClick={() => handleOpen("edit", p)}
                                    className="flex-1 px-3 py-1 rounded bg-purple-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                    type="button"
                                    onClick={() => handleOpen("delete", p)}
                                    className="flex-1 px-3 py-1 rounded bg-purple-500 text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        </div>
                    </>
                    }
                    <div className="">
                        {open && 
                        <Modal 
                        setOpen={setOpen}
                        type={modalType}
                        product={selectedProduct}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products