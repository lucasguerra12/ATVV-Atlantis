import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AtlantisProvider } from './context/AtlantisContext' 

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AtlantisProvider> 
      <App />
    </AtlantisProvider>
  </React.StrictMode>,
)