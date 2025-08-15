import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ApiContext } from "../context/ContextProvider";

function Navbar() {
  const {cart} = useContext(ApiContext)
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = cart.length;
  const location = useLocation()
  const [navTop, setNavTop] = useState("top-[44px]");
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 50) {
        // Scrolling down → stick navbar to top
        setNavTop("top-0");
      } else if (currentScroll <= 50) {
        // At the top → show banner space
        setNavTop("top-[44px]");
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header>
      <nav className={`fixed w-full z-50 shadow-md pr-2 pl-2 bg-white transition-all duration-300 ${navTop}`}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center justify-between w-1/2 md:w-fit">
              <button
                onClick={toggleMenu}
                aria-label="Toggle Menu"
                className="md:hidden mr-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <Link to='/'>
                <h1 className="text-xl font-bold">YarnlyChic</h1>
              </Link>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <a href="">NEW IN</a>
              <a href="/shop">SHOP</a>
              <a href="/about">ABOUT</a>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/search" state={{location}}>
                <Search size={24} />
              </Link>
              <div className="relative">
                <Link to='/cart'>
                  <ShoppingBag size={24} />
                </Link>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white shadow-md">
            <a href="" className="block px-4 py-2 hover:bg-gray-100">
              NEW IN
            </a>
            <a href="/shop" className="block px-4 py-2 hover:bg-gray-100">
              SHOP
            </a>
            <a href="/about" className="block px-4 py-2 hover:bg-gray-100">
              ABOUT
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
