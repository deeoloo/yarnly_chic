import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { routes } from './routes.jsx'
import ContextProvider from './context/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ContextProvider>
          <RouterProvider router={routes}/>
      </ContextProvider>
  </StrictMode>,
)
