import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header>
      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* LEFT SECTION */}
            <div className="flex items-center justify-between w-1/2 md:w-fit">
              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                aria-label="Toggle Menu"
                className="md:hidden mr-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <h1 className="text-xl font-bold">Logo</h1>
            </div>

            {/* CENTER SECTION (Desktop Menu) */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#">NEW IN</a>
              <a href="#">SHOP</a>
              <a href="#">ABOUT</a>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center space-x-4">
              <a href="#">
                <Search size={24} />
              </a>
              <div className="relative">
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md">
            <a href="#home" className="block px-4 py-2 hover:bg-gray-100">
              NEW IN
            </a>
            <a href="#shop" className="block px-4 py-2 hover:bg-gray-100">
              SHOP
            </a>
            <a href="#about" className="block px-4 py-2 hover:bg-gray-100">
              ABOUT
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
