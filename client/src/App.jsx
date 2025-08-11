import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
      <div className="">
        <Navbar/>
        <div className="">
            <Outlet/>
        </div>
      </div>
  )
}

export default App
