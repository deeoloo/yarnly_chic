import { useContext, useState } from "react"
import { FaMoneyBill, FaRegUser } from "react-icons/fa"
import { ApiContext } from "../context/ContextProvider"

function Dashboard(){
    const {products, orders} = useContext(ApiContext)

    let customers = []
    for (let order in orders){
        if (!(order.customer?.email in customers)){
            customers.push(order.customer?.email)
        }
    }

    const revenue = orders.reduce((acc, curr)=>{
        return acc + curr.pricing.total
    }, 0)

    const [orderPage, setOrderPage] = useState(1)
    const [productPage, setProductPage] = useState(1)

    const ordersPerPage = 10
    const productsPerPage = 9

    const totalOrderPages = Math.ceil(orders.length / ordersPerPage)
    const totalProductPages = Math.ceil(products.length / productsPerPage)

    const paginatedOrders = orders.slice(
        (orderPage - 1) * ordersPerPage,
        orderPage * ordersPerPage
    )
    const paginatedProducts = products.slice(
        (productPage - 1) * productsPerPage,
        productPage * productsPerPage
    )

    return(
        <div className="w-full flex-1 flex flex-col lg:flex-row">
            <div className="mx-5 lg:max-w-[30vw]">
                <h2 className="text-2xl mt-2 font-bold">Dashboard</h2>
                <div className="bg-purple-50 rounded-2xl mt-5 py-1">
                    <div className="p-3">
                        <h3 className="font-bold text-lg">Overview</h3>
                        
                    </div>
                    <div className="p-1 m-2 rounded-2xl bg-purple-100 flex gap-5 shadow-md">
                        <div className=" rounded-2xl bg-purple-50 w-1/2 p-5">
                            <div className="flex items-center space-x-2 my-2">
                                <FaRegUser/>
                                <p className="font-bold">Customers</p>
                            </div>
                            <h2 className="text-2xl">{customers.length}</h2>
                        </div>

                        <div className="p-5">
                            <div className="flex items-center space-x-2 my-2">
                                <FaMoneyBill/>
                                <p className="font-bold">
                                    Revenue
                                </p>
                            </div>
                            <h2 className="text-2xl">
                                {revenue}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-3 my-5">
                    <h3 className="text-lg font-bold">Orders</h3>
                     <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 text-sm">
                            <thead className="bg-purple-100">
                                <tr>
                                    <th className="p-2 border">First Name</th>
                                    <th className="p-2 border">Last Name</th>
                                    <th className="p-2 border">Address</th>
                                    <th className="p-2 border">City/Estate</th>
                                    <th className="p-2 border">Phone</th>
                                    <th className="p-2 border">Delivery Option</th>
                                    <th className="p-2 border">Payment</th>
                                    <th className="p-2 border">M-Pesa Code</th>
                                    <th className="p-2 border">Email</th>
                                    <th className="p-2 border">Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedOrders.map((order) => (
                                <tr key={order.id} className="text-center">
                                    <td className="p-2 border">{order.customer.firstName}</td>
                                    <td className="p-2 border">{order.customer.lastName}</td>
                                    <td className="p-2 border">{order.customer.address}</td>
                                    <td className="p-2 border">{order.customer.city}</td>
                                    <td className="p-2 border">{order.customer.phone}</td>
                                    <td className="p-2 border">{order.shippingMethod.name}</td>
                                    <td className="p-2 border">{order.payment.method}</td>
                                    <td className="p-2 border font-mono">{order.payment.mpesaCode}</td>
                                    <td className="p-2 border">{order.customer.email}</td>
                                    <td className="p-2 border">{order.note || "-"}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center items-center gap-3 mt-3">
                        <button 
                            disabled={orderPage === 1} 
                            onClick={() => setOrderPage(orderPage - 1)}
                            className="px-3 py-1 bg-purple-100 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span>Page {orderPage} of {totalOrderPages}</span>
                        <button 
                            disabled={orderPage === totalOrderPages} 
                            onClick={() => setOrderPage(orderPage + 1)}
                            className="px-3 py-1 bg-purple-100 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                     </div>
        
                </div>
            </div>
            <div className="mx-5 lg:max-w-[27vw]">
                <div className="my-15 rounded-2xl bg-purple-50">
                    <h2 className="text-lg font-bold p-3">
                        Products
                    </h2>
                    <div className="mx-3">
                        {paginatedProducts.map((p)=>{
                            return(
                            <div 
                            key={p.id} 
                            className="shadow-md rounded-2xl flex items-center justify-between gap-3 p-3 m-2"
                            >
                                <img 
                                    src={p.images[0]} 
                                    alt={p.name} 
                                    className="w-16 h-16 object-cover rounded-2xl" 
                                />
                                <div className="flex-1">
                                    <p className="font-medium">{p.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">Ksh {p.price}</p>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    <div className="flex justify-center items-center gap-3 mt-3 pb-3">
                        <button 
                            disabled={productPage === 1} 
                            onClick={() => setProductPage(productPage - 1)}
                            className="px-3 py-1 bg-purple-100 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span>Page {productPage} of {totalProductPages}</span>
                        <button 
                            disabled={productPage === totalProductPages} 
                            onClick={() => setProductPage(productPage + 1)}
                            className="px-3 py-1 bg-purple-100 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard