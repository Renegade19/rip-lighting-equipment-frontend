import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './lighting-equipment.css'
import { LightingEquipmentApp } from './LightingEquipmentApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode><LightingEquipmentApp /></StrictMode>,
)
