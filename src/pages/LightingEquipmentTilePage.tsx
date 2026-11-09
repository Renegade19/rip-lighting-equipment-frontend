import { useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { LightingEquipmentCard } from '../components/LightingEquipmentCard'
import { LightingEquipmentPowerFilter } from '../components/LightingEquipmentPowerFilter'
import type { LightingEquipment, LightingEquipmentPowerFilter as LightingEquipmentPowerFilterValue } from '../types/lightingEquipment'

export function LightingEquipmentTilePage({ lightingEquipment, isLightingEquipmentLoading, powerFilter, onApplyLightingEquipmentPower }: {
  lightingEquipment: LightingEquipment[]; isLightingEquipmentLoading: boolean
  powerFilter: LightingEquipmentPowerFilterValue
  onApplyLightingEquipmentPower: (powerFilter: LightingEquipmentPowerFilterValue) => void
}) {
  useEffect(() => { document.title = 'Плитка светильников — LumiCalc' }, [])
  return <section className="lighting-equipment-tile-page" aria-label="Плитка светильников">
    <h1 className="visually-hidden">Светильники LumiCalc</h1>
    <LightingEquipmentPowerFilter powerFilter={powerFilter} onApplyLightingEquipmentPower={onApplyLightingEquipmentPower} />
    {isLightingEquipmentLoading ? <div className="lighting-equipment-loading" role="status"><Spinner animation="border" /><span className="visually-hidden">Загрузка светильников</span></div>
      : <>
        <div className="lighting-equipment-result-count" role="status">Найдено светильников: {lightingEquipment.length}</div>
        <div className="lighting-equipment-grid">{lightingEquipment.map((equipment) =>
          <LightingEquipmentCard key={equipment.equipmentId} lightingEquipment={equipment} />)}</div>
        {!lightingEquipment.length && <Alert variant="light" className="lighting-equipment-empty">Светильников с такой мощностью нет. Измените диапазон фильтра.</Alert>}
      </>}
  </section>
}
