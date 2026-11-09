import { useState } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { LightingEquipmentNavigation } from './components/LightingEquipmentNavigation'
import { LightingEquipmentTilePage } from './pages/LightingEquipmentTilePage'
import { LightingEquipmentFeedPage } from './pages/LightingEquipmentFeedPage'
import { defaultLightingEquipmentPowerFilter } from './modules/lightingEquipmentRepository'
import { useLightingEquipment } from './hooks/useLightingEquipment'

function LightingEquipmentLayout() {
  const [powerFilter, setPowerFilter] = useState(defaultLightingEquipmentPowerFilter)
  const { lightingEquipment, isLightingEquipmentLoading } = useLightingEquipment(powerFilter)
  const location = useLocation()
  const isLightingEquipmentFeed = location.pathname.startsWith('/lighting-equipment/feed')
  return <div className={`lighting-equipment-screen${isLightingEquipmentFeed ? ' lighting-equipment-screen-feed' : ''}`}>
    <main className="lighting-equipment-content">
      <Routes>
        <Route path="/" element={<Navigate to="/lighting-equipment" replace />} />
        <Route path="/lighting-equipment" element={<LightingEquipmentTilePage lightingEquipment={lightingEquipment}
          isLightingEquipmentLoading={isLightingEquipmentLoading} powerFilter={powerFilter} onApplyLightingEquipmentPower={setPowerFilter} />} />
        <Route path="/lighting-equipment/feed" element={<LightingEquipmentFeedPage lightingEquipment={lightingEquipment} />} />
        <Route path="/lighting-equipment/feed/:equipmentId" element={<LightingEquipmentFeedPage lightingEquipment={lightingEquipment} />} />
        <Route path="*" element={<div className="lighting-equipment-not-found"><h1>Страница не найдена</h1><Link to="/lighting-equipment">Открыть светильники</Link></div>} />
      </Routes>
    </main>
    <LightingEquipmentNavigation />
  </div>
}

export function LightingEquipmentApp() {
  return <BrowserRouter><LightingEquipmentLayout /></BrowserRouter>
}
