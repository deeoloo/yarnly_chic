import Hero from "../components/Hero"
import ProductList from "../components/ProductList"
import Footer from "./Footer"

function Home(){
    return(
        <main>
            <Hero/>
            <ProductList/>
            <Footer/>
        </main>
    )
}

export default Home