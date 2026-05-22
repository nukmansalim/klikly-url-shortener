import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import {AppRouter} from './routes/index.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>

      <AppRouter />

    </AppProvider>
  </StrictMode>,
)
