
import SideBar from "./SideBar"
import { Outlet } from "react-router-dom"

function Layout(){
    
    return(
        <main className="mt-20">
            <div className="lg:flex">
                <SideBar/>
                <Outlet/>
            </div>
        </main>
    )
}

export default Layout