import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LightingEquipmentImage } from './LightingEquipmentImage'
import { LightingEquipmentIcon } from './LightingEquipmentIcon'
import type { LightingEquipment } from '../types/lightingEquipment'

export function LightingEquipmentCard({ lightingEquipment }: { lightingEquipment: LightingEquipment }) {
  return <Card as={Link} to={`/lighting-equipment/feed/${lightingEquipment.equipmentId}`}
    className="lighting-equipment-card" aria-label={`Открыть ${lightingEquipment.equipmentName}`}>
    <LightingEquipmentImage key={lightingEquipment.imageUrl} imageUrl={lightingEquipment.imageUrl}
      equipmentName={lightingEquipment.equipmentName} className="lighting-equipment-card-image" />
    <Card.Body>
      <Card.Title as="h2">{lightingEquipment.equipmentName}</Card.Title>
      <p className="lighting-equipment-card-power">{lightingEquipment.powerWatt} Вт</p>
      <span className="lighting-equipment-likes" aria-label={`Лайков: ${lightingEquipment.likedUserIds.length}`}>
        <LightingEquipmentIcon name="like" />{lightingEquipment.likedUserIds.length}
      </span>
    </Card.Body>
  </Card>
}
