import { useState } from 'react'
import { Card } from 'react-bootstrap'

export const defaultLightingEquipmentImage = '/media/default-lighting-equipment.svg'

export function LightingEquipmentImage({ imageUrl, equipmentName, className = '' }: {
  imageUrl: string; equipmentName: string; className?: string
}) {
  const [isLightingEquipmentImageUnavailable, setIsLightingEquipmentImageUnavailable] = useState(false)
  return <Card.Img className={className} src={isLightingEquipmentImageUnavailable || !imageUrl
    ? defaultLightingEquipmentImage : imageUrl}
    alt={equipmentName} loading="lazy" onError={() => setIsLightingEquipmentImageUnavailable(true)} />
}
