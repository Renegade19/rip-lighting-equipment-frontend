import { lightingEquipmentMock } from '../mocks/lightingEquipmentMock.ts'
import type { LightingEquipment, LightingEquipmentPowerFilter } from '../types/lightingEquipment.ts'

export const defaultLightingEquipmentPowerFilter: LightingEquipmentPowerFilter = {
  minPowerWatt: 0, maxPowerWatt: 10,
}

export function filterLightingEquipment(
  lightingEquipment: readonly LightingEquipment[],
  powerFilter: LightingEquipmentPowerFilter,
): LightingEquipment[] {
  const lower = Math.min(powerFilter.minPowerWatt, powerFilter.maxPowerWatt)
  const upper = Math.max(powerFilter.minPowerWatt, powerFilter.maxPowerWatt)
  return lightingEquipment.filter((equipment) => equipment.equipmentStatus === 'опубликован'
    && equipment.powerWatt >= lower && equipment.powerWatt <= upper)
}

// Асинхронный интерфейс пригодится в ЛР6. Сейчас здесь нет HTTP-запросов.
export async function getLightingEquipmentList(powerFilter: LightingEquipmentPowerFilter) {
  return filterLightingEquipment(lightingEquipmentMock, powerFilter)
}

export function getLightingEquipmentById(equipmentId: string | undefined) {
  if (!equipmentId || !/^[1-9]\d*$/.test(equipmentId)) return undefined
  return lightingEquipmentMock.find((equipment) => equipment.equipmentStatus === 'опубликован'
    && String(equipment.equipmentId) === equipmentId)
}

export function getNextLightingEquipment(
  lightingEquipment: readonly LightingEquipment[], equipmentId: number,
) {
  const currentIndex = lightingEquipment.findIndex((equipment) => equipment.equipmentId === equipmentId)
  return currentIndex < 0 ? undefined : lightingEquipment[currentIndex + 1]
}
