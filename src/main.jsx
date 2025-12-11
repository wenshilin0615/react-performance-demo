/*
 * @Author: 温石林
 * @Description: 
 * @FilePath: \react19_project\src\main.jsx
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
