import { createContext, useCallback, useEffect, useMemo, useState } from "react"

export const ApiContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL

function ContextProvider({children}){
    const [products, setProducts] = useState([])
    useEffect(() => {
    fetch(`${apiUrl}/products`)
      .then(r => r.json())
      .then(data => {
        const normalized = data.map(p => ({
          ...p,
          images: (p.images || []).map(img => {
            if (!img) return img;
            // This resolves '/images/..' correctly against apiUrl
            return new URL(img, apiUrl).toString();
          }),
        }));
        setProducts(normalized);
      });
  }, []);

  const assetUrl = useCallback((path) => {
    if (!path) return "";
    const s = String(path);
    if (/^https?:\/\//i.test(s)) return s;
    return new URL(s.replace(/^\/+/, ""), `${apiUrl}/`).toString();
  }, []);

    //cart
    const [cart, setCart] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem('cart.v1')) || [];
      }
      catch{
        return [];
      }
    });

      useEffect(() => {
        localStorage.setItem('cart.v1', JSON.stringify(cart));
      }, [cart]);

    const addToCart = useCallback((product) => {
      setCart(prev => {
        const existing = prev.find(p => p.id === product.id);
        if (!existing== -1) {
          const next=[...prev];
          next[existing] = {
            ...next[existing],
            quantity: next[existing].quantity + 1
          };
          return next;
        }
        console.log(product.images)
        return [...prev,
          { id: product.id,
            name: product.name,
            price: product.price,
            images: product.image?.[0] || "", 
            size: product.size,
            quantity: product.quantity
          },
        ];
      });
    }, []);

    const removeFromCart = useCallback(
      id => setCart(prev => prev.filter(p => p.id !== id)),
      []
    );

    const updateQuantity = useCallback(
      (id, quantity) => setCart(prev => prev.map(p => p.id===id?{
        ...p, quantity:Math.max(1, quantity)} : p)),
      []
    );

    const clearCart = useCallback(() => setCart([]), []);

    const subtotal = useMemo(() => {
      return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cart]);
    
    const value = useMemo(() => ({
      apiUrl,
      products,
      cart,
      assetUrl,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
    }), 
    [products, assetUrl, cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal]
  );

    return(
        <ApiContext.Provider value= {value} >
            {children}
        </ApiContext.Provider>
    )
}

export default ContextProvider