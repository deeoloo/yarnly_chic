import { useContext } from "react"
import { FaMoneyBill, FaRegUser } from "react-icons/fa"
import { ApiContext } from "../context/ContextProvider"

function Dashboard(){
    const {products} = useContext(ApiContext)

    console.log(products)
    return(
        <div className="w-full flex">
            <div className="mx-5 w-1/3 ">
                <h2 className="text-2xl mt-2 font-bold">Dashboard</h2>
                <div className="bg-purple-50 rounded-2xl mt-5 py-1">
                    <div className="flex justify-between p-3">
                        <h3 className="font-bold text-lg">Overview</h3>
                        <select name="filter" id="filter" className="rounded-2xl border w-30 p-2">
                            <option value="Month">Month</option>
                            <option value="Week">Week</option>
                            <option value="Day">Day</option>
                        </select>
                    </div>
                    <div className="p-1 m-2 rounded-2xl bg-purple-100 flex gap-5 shadow-md">
                        <div className=" rounded-2xl bg-purple-50 w-1/2 p-5">
                            <div className="flex items-center space-x-2 my-2">
                                <FaRegUser/>
                                <p className="font-bold">Customers</p>
                            </div>
                            <h2 className="text-2xl">1293</h2>
                        </div>

                        <div className="p-5">
                            <div className="flex items-center space-x-2 my-2">
                                <FaMoneyBill/>
                                <p className="font-bold">
                                    Revenue
                                </p>
                            </div>
                            <h2 className="text-2xl">
                                250,000
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-3 my-5">
                    <h3 className="text-lg font-bold">Orders</h3>
                    <div className="mx-2 mt-2 border">
                        <div className="">
                            table
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/4 mr-5">
                <div className="my-15 rounded-2xl bg-purple-50">
                    <h2 className="text-lg font-bold p-3">
                        Products
                    </h2>
                    <div className="mx-3">
                        {products.map((p)=>{
                            return(
                            <div key={p.id} className="shadow-md rounded-2xl grid grid-cols-3 gap-2 space-y-2 m-2">
                                <img src={p.images[0]} alt={p.name} className="w-15 h-15 object-cover rounded-2xl" />
                                <div className="border">
                                    <p className="">
                                        {p.name}
                                    </p>
                                </div>
                                <div className="border">
                                    <p className="font-bold">Ksh{p.price}</p>
                                    <span className=""></span>
                                </div>
                            </div>)
                        })}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard