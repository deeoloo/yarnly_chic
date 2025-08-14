import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../context/ContextProvider";

const fmtKES = n =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 2 })
    .format(Number(n) || 0);

function Cart() {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart, subtotal, clearCart } = useContext(ApiContext);
  const [agreed, setAgreed] = useState(false);

  if (!cart?.length) return <div className="p-6 text-center text-gray-600">Your cart is empty.</div>;
  console.log(cart)
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Cart</h1>
        <button onClick={clearCart} className="text-sm text-red-600 hover:underline">Clear cart</button>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-center">Quantity</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {cart.map((p) => {
              const qty = p.quantity ?? p.qty ?? 1; 
              return (
                <tr key={p.id} className="border-t">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded" />
                      <div className="min-w-0"><div className="font-medium truncate">{p.name}</div></div>
                    </div>
                  </td>

                  <td className="p-3 text-right">{fmtKES(p.price)}</td>

                  <td className="p-3">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => updateQty(p.id, Math.max(1, qty - 1))}
                        className="px-2 py-1 rounded border" aria-label={`Decrease ${p.name} quantity`}>−</button>
                      <span className="w-8 text-center">{qty}</span>
                      <button
                        onClick={() => updateQty(p.id, qty + 1)}   // ← fixed typo & logic
                        className="px-2 py-1 rounded border" aria-label={`Increase ${p.name} quantity`}>+</button>
                    </div>
                  </td>

                  <td className="p-3 text-right">{fmtKES((Number(p.price) || 0) * qty)}</td>

                  <td className="p-3 text-right">
                    <button onClick={() => removeFromCart(p.id)} className="hover:underline">Remove</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span>I agree to the <span className="underline">Terms & Conditions</span>.</span>
        </label>

        <div className="flex items-center gap-6 justify-between sm:justify-end">
          <div className="text-lg">
            <span className="mr-3 font-semibold">Subtotal</span>
            <span className="font-bold">{fmtKES(subtotal)}</span>
          </div>
          <button
            onClick={() => agreed && navigate("/checkout")}
            disabled={!agreed}
            className={`px-5 py-3 rounded-xl font-semibold text-white ${agreed ? "bg-black" : "bg-gray-400 cursor-not-allowed"}`}>
            Checkout
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500">Tax included and shipping calculated at checkout.</p>
    </div>
  );
}

export default Cart;
