import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedModal(){
    const [isOpen, setIsOpen] = useState(false);
    const [key, setKey] = useState("");
    const navigate = useNavigate();
    const secret = import.meta.env.VITE_SECRET_KEY;
    
    // Listen for hotkey (Ctrl+Shift+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "k") {
            setIsOpen(true);
        }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (key === secret) {
        sessionStorage.setItem("secret_key", key);
        setIsOpen(false);
        navigate("/dashboard");
        } else {
        alert("Wrong key!");
        }
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-purple-50 p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold ">Enter Secret Key</h2>
                <button
                onClick={() => setIsOpen(false)}
                className=" text-xl p-2 text-gray-500 hover:text-black hover:bg-purple-100"
                >
                    <X /> 
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Secret key"
                    className="border p-2 rounded w-full mb-4"
                />
                <button 
                    type="submit" 
                    className="bg-purple-600 text-white font-bold px-4 py-2 rounded">
                    Unlock
                </button>
            </form>
        </div>
        </div>
    )
}

export default ProtectedModal
// atsk_1b62ec004961baa9be3ef7f5c3b46bc01122991cf7b2392c0573030044846aa397948dc8
