import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import About from "./pages/About"
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"
import Product from "./components/Product"
import Search from "./components/Search"
import SizeChart from "./components/SizeChart"
import FAQs from "./components/Faqs"
import Socials from "./components/Socials"
import Policies from "./components/Policies"
import Contact from "./components/Contact"
import Layout from "./components/Layout"
import Products from "./pages/Products"
import Dashboard from "./components/Dashboard"


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'shop',
                element: <Shop/>
            },
            {
                path: 'about',
                element: <About/>
            },
            {
                path: 'cart',
                element: <Cart/>
            },
            {
                path: 'checkout',
                element: <Checkout/>
            },
            {
                path: 'product/:product',
                element: <Product/>
            },
            {
                path: 'policies',
                element: <Policies/>
            },
            {
                path: 'sizechart',
                element: <SizeChart/>
            },
            {
                path: 'faqs',
                element: <FAQs/>
            },
            {
                path: 'socials',
                element: <Socials/>
            },
            {
                path: 'contact',
                element: <Contact/>
            },
            {
                path: '/dashboard',
                element: <Layout/>,
                children:[
                    {
                        index: true,
                        element: <Dashboard/>
                    },
                    {
                        path:'products',
                        element:<Products/>
                    }
                ]
            }
        ]
    },
    {
        path: '/search',
        element: <Search/>
    }
    
])