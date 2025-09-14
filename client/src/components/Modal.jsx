import { X } from "lucide-react"

function Modal({ setOpen, type, product }) {
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-purple-50 p-6 rounded-2xl w-[500px] shadow-lg relative max-h-[90vh] overflow-y-auto">
            
                <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-xl p-2 text-gray-500 hover:text-black hover:bg-purple-100"
                >
                    <X /> 
                </button>

                {type === "add" && (
                <form
                    className="flex flex-col gap-3"
                    onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target)
                    const newProduct = {
                        name: formData.get("name"),
                        description: formData.get("description"),
                        category: formData.get("category"),
                        price: Number(formData.get("price")),
                        currency: formData.get("currency"),
                        images: [formData.get("image")],
                    }
                    console.log("Adding product:", newProduct)
                    // TODO: send to API
                    setOpen(false)
                    }}
                >
                    <h2 className="text-2xl font-bold mb-3">Add New Product</h2>
                    <input name="name" type="text" placeholder="Name" className="border p-2 rounded" required />
                    <textarea name="description" placeholder="Description" className="border p-2 rounded" required />
                    <input name="category" type="text" placeholder="Category" className="border p-2 rounded" required />
                    <input name="price" type="number" placeholder="Price" className="border p-2 rounded" required />
                    <input name="currency" type="text" placeholder="Currency" defaultValue="KES" className="border p-2 rounded" />
                    <input name="image" type="url" placeholder="Image URL" className="border p-2 rounded" required />

                    <button type="submit" className="bg-purple-500 text-white p-2 rounded">Add Product</button>
                </form>
                )}

                {type === "view" && (
                <div>
                    <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
                    <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-56 object-contain rounded-lg mb-4"
                    />
                    <span className="font-bold">Description:</span>
                    <p className="text-gray-700 mb-2">{product.description}</p>

                    <p>
                        <strong>Category:</strong> {product.category}
                    </p>
                    <p>
                        <strong>Price:</strong> {product.currency} {product.price}
                    </p>
                    <p>
                        <strong>Bestseller:</strong> {product.bestseller ? "Yes" : "No"}
                    </p>
                    <p>
                        <strong>Occasions:</strong>{" "}
                        {product.occasions?.length > 0
                            ? product.occasions.join(", ")
                            : "N/A"}
                    </p>
                    <p>
                        <strong>Colors:</strong>{" "}
                        {product.colors?.length > 0
                            ? product.colors.join(", ")
                            : "N/A"}
                    </p>
                </div>
                )}

            
                {type === "edit" && (
                <form className="flex flex-col gap-3">
                    <h2 className="text-2xl font-bold mb-3">Edit Product</h2>

                    <label>
                        Name:
                        <input
                            type="text"
                            defaultValue={product.name}
                            className="border p-2 rounded w-full"
                        />
                    </label>

                    <label>
                        Description:
                        <textarea
                            defaultValue={product.description}
                            className="border p-2 rounded w-full"
                        />
                    </label>

                    <label>
                        Category:
                        <input
                            type="text"
                            defaultValue={product.category}
                            className="border p-2 rounded w-full"
                        />
                    </label>

                    <label>
                        Price:
                        <input
                            type="number"
                            defaultValue={product.price}
                            className="border p-2 rounded w-full"
                        />
                    </label>

                    <label>
                        Currency:
                        <input
                            type="text"
                            defaultValue={product.currency}
                            className="border p-2 rounded w-full"
                        />
                    </label>

                    <label>
                        Bestseller:
                        <input
                            type="checkbox"
                            defaultChecked={product.bestseller}
                            className="ml-2"
                        />
                    </label>

                    <button
                    type="submit"
                    className="bg-purple-500 text-white p-2 rounded mt-3"
                    // Todo: Update database and state
                    >
                        Save Changes
                    </button>
                </form>
                )}

            
                {type === "delete" && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Delete Product</h2>
                    <p>
                        Are you sure you want to delete{" "}
                        <strong>{product.name}</strong> from your database?
                    </p>
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 bg-gray-200 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                            // TODO: Call delete API
                            console.log("Deleted product:", product.id)
                            setOpen(false)
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default Modal
