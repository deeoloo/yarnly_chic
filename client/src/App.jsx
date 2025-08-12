import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Footer from './pages/Footer'

function App() {

  return (
      <div className="">
        <Banner/>
        <Navbar/>
        <div className="">
            <Outlet/>
        </div>
        <Footer/>
      </div>
  )
}

export default App
