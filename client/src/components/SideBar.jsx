import { Contact, Handbag, LayoutDashboard, Logs } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

function SideBar(){
    const location = useLocation()
    
    return(
        <div className="lg:w-[20vw]">
            <ul className="p-2">
                <li className="p-2 mt-2 rounded-2xl  hover:bg-purple-300 border-b-1">
                    <Link to="/dashboard">
                        <div className="flex justify-center lg:justify-start">
                            <LayoutDashboard className="mx-2" />
                            Dashboard
                        </div>
                    </Link>
                </li>
                <li className={"p-2 rounded-2xl mt-2 hover:bg-purple-300 border-b-1"}>
                    <Link to="/dashboard/products">
                        <div className="flex justify-center lg:justify-start">
                            <Handbag  className="mx-2" />
                            Product
                        </div>
                    </Link>
                </li>
                
            </ul>
        </div>
    )
}

export default SideBar
