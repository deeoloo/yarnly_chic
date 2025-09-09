import { Handbag, LayoutDashboard, Logs } from "lucide-react"
import { Link } from "react-router-dom"

function SideBar(){
    return(
        <div className="w-[20vw] border">
            <ul className="p-2">
                <li className="p-2 rounded-2xl mt-2 hover:bg-purple-300 focus:bg-purple-100">
                    <Link to="">
                        <div className="flex">
                            <LayoutDashboard className="mx-2" />
                            Dashboard
                        </div>
                    </Link>
                </li>
                <li className="p-2 rounded-2xl mt-2 hover:bg-purple-300 focus:bg-purple-100">
                    <Link to="">
                        <div className="flex">
                            <Handbag  className="mx-2" />
                            Product
                        </div>
                    </Link>
                </li>
                <li className="p-2 rounded-2xl mt-2 hover:bg-purple-300 focus:bg-purple-100">
                    <Link to="">
                        <div className="flex">
                            <Logs className="mx-2" />
                            Orders
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBar
