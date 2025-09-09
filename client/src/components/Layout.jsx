import Dashboard from "./Dashboard"
import SideBar from "./SideBar"

function Layout(){
    return(
        <main className="mt-20">
            <div className="border flex">
                <SideBar/>
                <Dashboard/>
            </div>
        </main>
    )
}

export default Layout