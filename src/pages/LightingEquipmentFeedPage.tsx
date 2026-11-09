import { useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LightingEquipmentVideo } from '../components/LightingEquipmentVideo'
import { LightingEquipmentIcon } from '../components/LightingEquipmentIcon'
import { getLightingEquipmentById, getNextLightingEquipment } from '../modules/lightingEquipmentRepository'
import type { LightingEquipment } from '../types/lightingEquipment'

function LightingEquipmentFeedContent({ lightingEquipment, nextLightingEquipment }: {
  lightingEquipment: LightingEquipment; nextLightingEquipment?: LightingEquipment
}) {
  const navigate = useNavigate()
  const [isLightingEquipmentDescriptionExpanded, setIsLightingEquipmentDescriptionExpanded] = useState(false)
  useEffect(() => { document.title = `${lightingEquipment.equipmentName} — LumiCalc` }, [lightingEquipment.equipmentName])
  return <article className="lighting-equipment-feed">
    <LightingEquipmentVideo key={lightingEquipment.equipmentId} lightingEquipment={lightingEquipment} />
    <div className="lighting-equipment-feed-gradient" />
    <div className="lighting-equipment-feed-info">
      <h1>{lightingEquipment.equipmentName}</h1>
      <p id="lighting-equipment-description" className={isLightingEquipmentDescriptionExpanded ? '' : 'lighting-equipment-description-short'}>{lightingEquipment.shortDescription}</p>
      <Button variant="link" className="lighting-equipment-description-toggle"
        aria-expanded={isLightingEquipmentDescriptionExpanded} aria-controls="lighting-equipment-description"
        onClick={() => setIsLightingEquipmentDescriptionExpanded((expanded) => !expanded)}>
        {isLightingEquipmentDescriptionExpanded ? 'Меньше' : 'Больше'}
      </Button>
    </div>
    <aside className="lighting-equipment-feed-side" aria-label="Характеристики светильника">
      <div className="lighting-equipment-feed-spec"><strong>{lightingEquipment.powerWatt} Вт</strong><span>Мощность</span></div>
      <div className="lighting-equipment-feed-spec"><strong>{lightingEquipment.beamAngleDeg}°</strong><span>Угол</span></div>
      <span className="lighting-equipment-feed-likes" aria-label={`Лайков: ${lightingEquipment.likedUserIds.length}`}>
        <LightingEquipmentIcon name="like" />{lightingEquipment.likedUserIds.length}
      </span>
      <Button className="lighting-equipment-next" variant="link" disabled={!nextLightingEquipment}
        aria-label="Следующий светильник" onClick={() => {
          if (nextLightingEquipment) navigate(`/lighting-equipment/feed/${nextLightingEquipment.equipmentId}`)
        }}><LightingEquipmentIcon name="next" /><span>Далее</span></Button>
    </aside>
  </article>
}

export function LightingEquipmentFeedPage({ lightingEquipment }: { lightingEquipment: LightingEquipment[] }) {
  const { equipmentId } = useParams()
  const equipment = equipmentId ? getLightingEquipmentById(equipmentId) : lightingEquipment[0]
  if (!equipment) return <div className="lighting-equipment-feed-unavailable"><Alert variant="light">
    {equipmentId ? 'Светильник недоступен.' : 'В выбранном диапазоне нет светильников.'}
    <Link to="/lighting-equipment">Вернуться к плитке</Link>
  </Alert></div>
  const nextEquipment = getNextLightingEquipment(lightingEquipment, equipment.equipmentId)
  return <LightingEquipmentFeedContent key={equipment.equipmentId} lightingEquipment={equipment} nextLightingEquipment={nextEquipment} />
}
