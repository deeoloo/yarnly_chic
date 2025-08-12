import { createContext, useEffect, useState } from "react"

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
    
    return(
        <ApiContext.Provider value={products}>
            {children}
        </ApiContext.Provider>
    )
}

export default ContextProvider