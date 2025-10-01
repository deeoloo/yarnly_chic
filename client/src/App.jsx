import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Footer from './pages/Footer'
import ProtectedModal from './components/ProtectedModal'

function App() {

  return (
      <div className="flex flex-col min-h-screen">
        <Banner/>
        <Navbar/>
        <div className="flex-grow">
            <Outlet/>
            
        </div>
        <Footer/>
      </div>
  )
}

export default App
