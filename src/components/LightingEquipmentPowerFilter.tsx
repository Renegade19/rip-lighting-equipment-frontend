import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import type { LightingEquipmentPowerFilter as LightingEquipmentPowerFilterValue } from '../types/lightingEquipment'

interface LightingEquipmentPowerFilterProps {
  powerFilter: LightingEquipmentPowerFilterValue
  onApplyLightingEquipmentPower: (powerFilter: LightingEquipmentPowerFilterValue) => void
}

export function LightingEquipmentPowerFilter({ powerFilter, onApplyLightingEquipmentPower }: LightingEquipmentPowerFilterProps) {
  const [minPowerWatt, setMinPowerWatt] = useState(powerFilter.minPowerWatt)
  const [maxPowerWatt, setMaxPowerWatt] = useState(powerFilter.maxPowerWatt)
  return <Form className="lighting-equipment-power-filter" onSubmit={(event) => {
    event.preventDefault()
    onApplyLightingEquipmentPower({ minPowerWatt, maxPowerWatt })
  }}>
    <div className="lighting-equipment-filter-heading"><h2>Мощность</h2>
      <output aria-live="polite">{minPowerWatt} — {maxPowerWatt} Вт</output></div>
    <Form.Group controlId="lighting-equipment-min-power" className="lighting-equipment-filter-row">
      <Form.Label>от</Form.Label><Form.Range min={0} max={10} step={0.1} value={minPowerWatt}
        aria-label="Минимальная мощность, Вт" onChange={(event) => {
          const power = Number(event.target.value); setMinPowerWatt(power)
          if (power > maxPowerWatt) setMaxPowerWatt(power)
        }} />
    </Form.Group>
    <Form.Group controlId="lighting-equipment-max-power" className="lighting-equipment-filter-row">
      <Form.Label>до</Form.Label><Form.Range min={0} max={10} step={0.1} value={maxPowerWatt}
        aria-label="Максимальная мощность, Вт" onChange={(event) => {
          const power = Number(event.target.value); setMaxPowerWatt(power)
          if (power < minPowerWatt) setMinPowerWatt(power)
        }} />
    </Form.Group>
    <div className="lighting-equipment-filter-scale"><span>0 Вт</span><span>10 Вт</span></div>
    <Button type="submit" className="lighting-equipment-apply-power">Применить</Button>
  </Form>
}
