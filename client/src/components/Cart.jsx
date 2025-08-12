import { useContext, useState } from "react";
import { ApiContext } from "../context/ContextProvider";

const fmtKES = (n) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 2,
  }).format(n || 0);

export default function Cart({ onCheckout }) {
  const {
    cart,
    updateQty,
    removeFromCart,
    subtotal,
    clearCart,
  } = useContext(ApiContext);

  const [agreed, setAgreed] = useState(false);

  if (!cart?.length) {
    return (
      <div className="p-6 text-center text-gray-600">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:underline"
        >
          Clear cart
        </button>
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
            {cart.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div className="min-w-0">
                      <div className="font-medium truncate">{product.name}</div>
                    </div>
                  </div>
                </td>

                <td className="p-3 text-right">{fmtKES(product.price)}</td>

                <td className="p-3">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => updateQty(product.id, Math.max(1, (product.quantity || 1) - 1))}
                      className="px-2 py-1 rounded border"
                      aria-label={`Decrease ${product.name} quantity`}
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{product.quantity}</span>
                    <button
                      onClick={() => updateQty(it.id, (product.quantitity || 1) + 1)}
                      className="px-2 py-1 rounded border"
                      aria-label={`Increase ${product.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="p-3 text-right">
                  {fmtKES((product.price || 0) * (product.qty || 1))}
                </td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            I agree to the <span className="underline">Terms & Conditions</span>.
          </span>
        </label>

        <div className="flex items-center gap-6 justify-between sm:justify-end">
          <div className="text-lg">
            <span className="mr-3 font-semibold">Subtotal</span>
            <span className="font-bold">{fmtKES(subtotal)}</span>
          </div>
          <button
            onClick={() => agreed && onCheckout && onCheckout()}
            disabled={!agreed}
            className={`px-5 py-3 rounded-xl font-semibold text-white ${
              agreed ? "bg-black" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Checkout
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Tax included and shipping calculated at checkout.
      </p>
    </div>
  );
}