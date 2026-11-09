import { useEffect, useState } from 'react'
import { getLightingEquipmentList } from '../modules/lightingEquipmentRepository'
import type { LightingEquipment, LightingEquipmentPowerFilter } from '../types/lightingEquipment'

export function useLightingEquipment(powerFilter: LightingEquipmentPowerFilter) {
  const [lightingEquipment, setLightingEquipment] = useState<LightingEquipment[]>([])
  const [isLightingEquipmentLoading, setIsLightingEquipmentLoading] = useState(true)
  useEffect(() => {
    let isCurrentLightingEquipmentRequest = true
    setIsLightingEquipmentLoading(true)
    getLightingEquipmentList(powerFilter).then((equipment) => {
      if (isCurrentLightingEquipmentRequest) {
        setLightingEquipment(equipment)
        setIsLightingEquipmentLoading(false)
      }
    })
    // Не обновляем состояние от завершившегося старого запроса после смены фильтра.
    return () => { isCurrentLightingEquipmentRequest = false }
  }, [powerFilter])
  return { lightingEquipment, isLightingEquipmentLoading }
}
