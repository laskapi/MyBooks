import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h3>Welcome to MyBooks</h3>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
