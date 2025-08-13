import { useContext, useMemo, useState } from "react";
import { ApiContext } from "../context/ContextProvider";

const POCHI_NUMBER = "0716044996";
const CURRENCY = "KES";

const shippingOptions = [
  { id: "free",   name: "FREE SHIPPING", desc: "",                                            price: 0   },
  { id: "cbd",    name: "CBD Collection point", desc: "(1-3 business days after completion)", price: 150 },
  { id: "mtaani", name: "Mtaani pickup",       desc: "(1-3 business days after completion)",  price: 200 },
  { id: "home",   name: "Doorstep delivery (Nairobi)", desc:"(1-3 business days)",           price: 250 },
  { id: "parcel", name: "Parceling outside Nairobi", desc:"(1-3 business days)",             price: 300 },
];

export default function Checkout({ cart: cartProp = [] }) {
  const { apiUrl, cart: cartCtx } = useContext(ApiContext); 
  const cart = cartProp.length ? cartProp : (cartCtx || []);

  const [country] = useState("Kenya");
  const [shipId, setShipId] = useState("free");
  const [mpesaCode, setMpesaCode] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", address: "", city: "", email: ""
  });
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const qty = Number(item.quantity ?? item.qty ?? 1);
      return acc + (Number(item.price) || 0) * qty;
    }, 0);
  }, [cart]);

  const shipping = shippingOptions.find(o => o.id === shipId)?.price ?? 0;
  const total = subtotal + shipping;

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const validateForm = () => {
    if (!cart.length) return setError("Your cart is empty."), false;
    if (!form.firstName || !form.lastName || !form.phone || !form.address || !form.city)
      return setError("Please fill in all required fields."), false;
    if (!mpesaCode || !/^[A-Z0-9]{8,12}$/i.test(mpesaCode.trim()))
      return setError("Enter a valid M-Pesa code (8–12 letters/numbers)."), false;
    setError(""); return true;
  };

  const placeOrder = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const chosen = shippingOptions.find(o => o.id === shipId);
    const order = {
      items: cart.map(i => ({
        id: i.id, name: i.name, price: i.price,
        quantity: Number(i.quantity ?? i.qty ?? 1), image: i.image
      })),
      pricing: { subtotal, shipping: chosen?.price || 0, total, currency: CURRENCY },
      shippingMethod: chosen,
      payment: { method: "mpesa-pochi", pochiNumber: POCHI_NUMBER, mpesaCode: mpesaCode.trim() },
      customer: { ...form, country, saveInfo },
      note,
      createdAt: new Date().toISOString(),
      status: "pending_verification"
    };

    try {
      const resp = await fetch(`${apiUrl}/orders`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order)
      });
      const saved = await resp.json();

      await fetch(`${apiUrl}/send-order-email`, {      
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: { ...order, id: saved?.id } })
      });

      setDone(true);
    } catch (err) {
      setError("Could not place order. Please try again or contact us.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="text-center p-5">
        <h2 className="text-2xl font-bold">Order Placed Successfully!</h2>
        <p>Thank you for your order. We will contact you shortly after we verify your payment.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-6">
      {/* LEFT */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Delivery</h2>

        <div>
          <label className="block text-sm mb-1">Country/Region</label>
          <select className="w-full p-2 border rounded" value={country} disabled>
            <option>Kenya</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <input className="w-full p-2 border rounded" name="firstName" value={form.firstName} onChange={onChange} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input className="w-full p-2 border rounded" name="lastName" value={form.lastName} onChange={onChange} required />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Address</label>
          <input className="w-full p-2 border rounded" name="address" value={form.address} onChange={onChange} required />
        </div>

        <div>
          <label className="block text-sm mb-1">City/Estate</label>
          <input className="w-full p-2 border rounded" name="city" value={form.city} onChange={onChange} required />
        </div>

        <div>
          <label className="block text-sm mb-1">Phone number</label>
          <input className="w-full p-2 border rounded" name="phone" value={form.phone} onChange={onChange} required />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" checked={saveInfo} onChange={() => setSaveInfo(!saveInfo)} className="h-4 w-4" />
          <label className="text-sm">Save this information for next time</label>
        </div>

        {/* Shipping */}
        <div>
          <h3 className="font-medium mb-2">Shipping Options</h3>
          <div className="border rounded overflow-hidden">
            {shippingOptions.map((o) => (
              <label key={o.id} className={`flex items-center justify-between p-3 border-b last:border-b-0 cursor-pointer ${shipId===o.id ? "bg-amber-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="shipping" value={o.id} checked={shipId===o.id} onChange={() => setShipId(o.id)} />
                  <div>
                    <div className="font-medium text-sm">{o.name}</div>
                    {o.desc && <div className="text-xs text-gray-500">{o.desc}</div>}
                  </div>
                </div>
                <div className="text-sm">{o.price ? `Ksh ${o.price.toLocaleString()}` : "FREE"}</div>
              </label>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="space-y-2">
          <h3 className="font-medium">Payment</h3>
          <p className="text-sm">Pay via M-Pesa (Pochi la biashara).</p>
          <ol className="list-decimal ml-5 text-sm space-y-1">
            <li>Go to M-Pesa → Pochi la Biashara.</li>
            <li>Send <b>{CURRENCY} {total.toLocaleString()}</b> to <b>{POCHI_NUMBER}</b>.</li>
            <li>Copy the mpesa code.</li>
          </ol>
          <div>
            <label className="block text-sm mb-1">M-Pesa Code</label>
            <input className="w-full p-2 border rounded" value={mpesaCode} onChange={(e)=>setMpesaCode(e.target.value)} placeholder="e.g., QAB12XYZ3" required />
          </div>
        </div>

        {/* Email + note */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Email (optional)</label>
            <input className="w-full p-2 border rounded" name="email" value={form.email} onChange={onChange} type="email" />
          </div>
          <div>
            <label className="block text-sm mb-1">Note (optional)</label>
            <textarea className="w-full p-2 border rounded" value={note} onChange={(e)=>setNote(e.target.value)} rows="3" placeholder="Gate code, preferred time…" />
          </div>
        </div>
      </div>

      {/* RIGHT: Summary */}
      <div>
        <div className="border rounded p-4 space-y-4 sticky top-4">
          <div className="space-y-2">
            {cart.map(item => {
              const qty = Number(item.quantity ?? item.qty ?? 1);
              return (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />}
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-gray-500">Quantity: {qty}</div>
                    </div>
                  </div>
                  <div>Ksh {(Number(item.price) * qty).toLocaleString()}</div>
                </div>
              );
            })}
          </div>

          <div className="border-t pt-2">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>Ksh {subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping ? `Ksh ${shipping.toLocaleString()}` : "FREE"}</span></div>
            <div className="flex justify-between font-medium text-lg"><span>Total</span><span>Ksh {total.toLocaleString()}</span></div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <button onClick={placeOrder} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
