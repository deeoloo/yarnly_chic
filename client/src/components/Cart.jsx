import { useContext, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { ApiContext } from "../context/ContextProvider";

const fmtKES = n =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 2 })
    .format(Number(n) || 0);

function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, subtotal, clearCart } = useContext(ApiContext);
  const [agreed, setAgreed] = useState(false);

  if (!cart?.length) return <div className="p-6 text-center text-gray-600">Your cart is empty.</div>;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Cart</h1>
        <button onClick={clearCart} className="text-sm text-purple-600 hover:underline">
          Clear cart
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cart.map((p) => {
        const qty = p.quantity ?? p.qty ?? 1;

        return (
          <div
            key={p.id}
            className="flex flex-col p-4 border rounded-xl shadow-sm"
          >
            {/* Product image */}
            <img
              src={p.images}
              alt={p.name}
              className="w-full h-40 object-contain rounded mb-3"
            />

            {/* Product details */}
            <div className="flex-1">
              <div className="font-medium text-lg truncate">{p.name}</div>
              <div className="text-sm font-medium mb-2">{fmtKES(p.price)}</div>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => updateQuantity(p.id, Math.max(1, qty - 1))}
                className="px-2 py-1 rounded border"
              >
                −
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button
                onClick={() => updateQuantity(p.id, qty + 1)}
                className="px-2 py-1 rounded border"
              >
                +
              </button>
            </div>

            {/* Total + Remove */}
            <div className="flex items-center justify-between mt-auto">
              <div className="font-semibold">
                {fmtKES((Number(p.price) || 0) * qty)}
              </div>
              <button
                onClick={() => removeFromCart(p.id)}
                className="text-sm text-purple-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            I agree to the <Link to="/policies" className="underline">Terms & Conditions</Link>.
          </span>
        </label>

        <div className="flex items-center gap-6 justify-between sm:justify-end">
          <div className="text-lg">
            <span className="mr-3 font-semibold">Subtotal</span>
            <span className="font-bold">{fmtKES(subtotal)}</span>
          </div>
          <button
            onClick={() => agreed && navigate("/checkout")}
            disabled={!agreed}
            className={`px-5 py-3 rounded-xl font-semibold text-black ${
              agreed ? "bg-purple-500" : "bg-purple-300 cursor-not-allowed"
            }`}
          >
            Checkout
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Tax included and delivery cost are calculated at checkout.
      </p>
    </div>
  );
}

export default Cart;