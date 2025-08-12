import Halves from "../components/Halves"
import Hero from "../components/Hero"
import ProductList from "../components/ProductList"
import Footer from "./Footer"

function Home(){
    return(
        <main>
            <Hero/>
            <ProductList/>
            <Halves/>
            <Footer/>
        </main>
    )
}

export default Home