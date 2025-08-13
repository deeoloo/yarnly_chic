import { useContext, useMemo, useState } from "react";
import { ApiContext } from "../context/ContextProvider";


const {apiUrl} = useContext(ApiContext);
    const pochi_number = "0716044996"
    const currency = "KES";

    const shippingOptions = [
        {id : "free", name: "Free Shipping", desc: "", price: 0},
        {id : "cbd", name: "CBD Collection point", desc: "(1-3 business days after completion)", price: 150},
        {id : "mtaani", name: "Mtaani pickup", desc: "(1-3 business days after completion)", price: 200},
        {id : "home delivery", name: "Doorstep delivery within Nairobi", desc:"(1-3 business days after completion)", price:250},
        {id : "parceling outside Nairobi", name: "Parceling outside Nairobi", desc:"(1-3 business days after completion)", price: 300},
    ]

function Checkout({cart=[]}) {
    const [Country] = useState("Kenya")
    const [shipId, setShipId] = useState("free")
    const [mpesaCode, setMpesaCode]= useState("")
    const [saveInfo, setSaveInfo] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        phone: "",
        mpesacode: "",
        country: Country,
    });

    const [note, setNote] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const subtotal = useMemo(() => {cart.reduce((acc, item) => acc + (item.price || 0 * item.quantity || 1), 0)}, [cart]);
    const shipping = shippingOptions.find(option => option.id === shipId)?.price || 0;
    const total = subtotal + shipping;
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value })); 
    }

    const validateForm = () => {
        if (!form.firstName || !form.lastName || !form.phone || !form.address || !form.city) {
            setError("Please fill in all required fields.");
            return false;
        }
        if (!mpesaCode) {
            setError("Please enter a valid M-Pesa code received after payment");
            return false;
        }
    
        setError("");
        return true;
    }
    
    const placeOrder = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
 

        const order ={
            ...form,
            note,
            shipping: shipId,
            total,
            cart: cart.map(item => ({
                productId: item.id,
                quantity: item.quantity || 1
            })),
            mpesaCode,
            createdAt: new Date().toISOString(),
            status: "pending",
        };
        try {
            const response = await fetch(`${apiUrl}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });

            await fetch(`${apiUrl}/send-order-mail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({order}),
            });

            if (!response.ok) {
                throw new Error("Failed to place order");
            }

            const data = await response.json();
            setDone(true);
            setLoading(false);
            console.log("Order placed successfully:", data);
        } catch (error) {
            setError(error.message || "An error occurred while placing the order.");
            setLoading(false);
        }
    }

    if (done) {
        return (
            <div className="text-center p-5">
                <h2 className="text-2xl font-bold">Order Placed Successfully!</h2>
                <p>Thank you for your order. We will contact you shortly, after we've checked your order.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-6">
            {/*Left side for the form, deliery and payment*/}
            <div className="space-y-6">
                <h2 className="text-xl font-semibold">Delivery</h2>
                {/*Country*/}
                <div>
                    <label className="block text-sm mb-1">Country/Region</label>
                    <select className="w-full p-2 border rounded" value={Country} disabled>
                        <option value="Kenya">Kenya</option>
                    </select>
                </div>
                {/*Names*/}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={onChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={onChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>
                {/*address*/}
                <div>
                    <label className="block text-sm mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={onChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                {/*City*/}
                <div>
                    <label className="block text-sm mb-1">City/Estate</label>
                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={onChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/*Phone*/}
                <div>
                    <label className="block text-sm mb-1">Phone number</label>
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={saveInfo}
                        onChange={() => setSaveInfo(!saveInfo)}
                        className="h-4 w-4"
                    />
                    <label className="text-sm">Save this information for next time</label>
                </div>

                {/*Shipping options*/}
                <div>
                    <h3 className="font-medium mb-2">Shipping Options</h3>
                    <div className="border rounded overflow-hidden">
                        {shippingOptions.map((option, idx)=>(
                            <label key={idx} className={`flex items-center p-3 border-b
                             ${idx === shippingOptions.length - 1 ? '' : 'border-b-gray-200'}`}>
                                <input
                                    type="radio"
                                    name="shipping"
                                    value={option.id}
                                    checked={shipId === option.id}
                                    onChange={() => setShipId(option.id)}
                                />
                                <div className="font-medium text-sm">
                                    {option.desc && <span className="text-gray-500">{option.desc} - </span>}

                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/*Payment*/}
                <div className="space-y-2">
                    <h3 className="font-medium">Payment</h3>
                    <p className="text-sm">Pay via M-Pesa (Pochi la biashara)</p>
                    <ol className="list-decimal ml-5 text-sm space-y-1">
                        <li>Go to M-Pesa menu</li>
                        <li>Select "Lipa na M-Pesa"</li>
                        <li>Select "Pochi la biashara"</li>
                        <li>Enter the number: {pochi_number}</li>
                        <li>Enter the amount: {total} {currency}</li>
                        <li>Enter your M-Pesa pin</li>
                        <li>Copy the M-Pesa code and paste it below</li>
                    </ol>
                    <div>
                        <label className="block text-sm mb-1">M-Pesa Code</label>
                        <input
                            type="text"
                            name="mpesacode"
                            placeholder="Enter M-Pesa code"
                            value={mpesaCode}
                            onChange={(e) => setMpesaCode(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>            
                </div>
                {/*Note and email*/}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm mb-1">Email (optional)</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Note (optional)</label>
                        <textarea
                            name="note"
                            value={note}
                            placeholder="Gate code, preferred time…"
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                        ></textarea>
                    </div> 
                </div>   
            </div>

            {/*Right side for the summary*/}
            <div>
                <div className="border rounded p-4 space-y-4 sticky top-4">
                    <div className="space-y-2">
                        {cart.map(item=>(
                            <div key ={item.id} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                    )}
                                    <div>
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-gray-500">Quantity: {item.quantity || 1}</div>
                                    </div>
                                </div>
                                <div> Ksh {(Number(item.price) * (item.quantity || 1)).toLocaleString()}</div>
                            </div>   
                        ))}
                    </div>
                    <div className="border-t pt-2">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>Ksh {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span>Ksh {shipping.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-medium text-lg">
                            <span>Total</span>
                            <span>Ksh {total.toLocaleString()}</span>
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error}
                            </div>
                        )}  
                        <button
                            onClick={placeOrder}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            disabled={loading}
                        >
                            {loading ? "Placing Order..." : "Place Order"}
                        </button>
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default Checkout



    