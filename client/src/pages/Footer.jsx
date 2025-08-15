import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import FAQs from "../components/Faqs";

const Footer = () => {
  return (
    <footer className="bg-purple-800 py-10 w-full relative ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-black">
        
        <div className="bg-gray-200 p-6 rounded">
          <Link to="/" className="font-semibold text-lg mb-3 inline-block hover:underline">
            YarnlyChic
          </Link>
          <nav className="flex flex-col gap-2 mb-4">
            <Link to="/policies" className="hover:underline">Policies</Link>
            <Link to="/socials" className="hover:underline">Socials</Link>
          </nav>
          <div className="flex items-center gap-4 text-2xl">
            <a href="https://www.instagram.com/yarnlychic_ke?igsh=ZzZoMnUxdmoydm12" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://youtube.com/@yarnlychic_ke?si=EeKOLhg_-H3znu8I" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
            <a href="https://www.tiktok.com/@yarnlychic_ke?_t=ZM-8ymvGZKhmUi&_r=1" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
          </div>
        </div>

        <div className="bg-gray-200 p-6 rounded">
          <Link to="/about" className="font-semibold text-lg mb-3 inline-block hover:underline">
            About
          </Link>
          <nav className="flex flex-col gap-2">
            <Link to="/shop" className="hover:underline">Shop our Collection</Link>
          </nav>
        </div>

        
        <div className="bg-gray-200 p-6 rounded">
          <Link to="/information" className="font-semibold text-lg mb-3 inline-block hover:underline">
            Information
          </Link>
          <nav className="flex flex-col gap-2">
            <Link to="/contact" className="hover:underline">Contact</Link>
            <FAQs/>
            <Link to="/sizechart" className="hover:underline">Size Chart</Link>
          </nav>
        </div>

        
        <div className="bg-gray-200 p-6 rounded">
          <Link to="/follow-our-journey" className="font-semibold text-lg mb-3 inline-block hover:underline">
            Follow Our Journey
          </Link>
          <p className="text-sm mb-4">
            Be a part of our story and join us on our latest news, VIP events and exclusive offers.
          </p>
          <Link
            to="/subscribe"
            className="inline-block bg-purple-800 text-white px-4 py-2 rounded hover:opacity-90"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;