import { useState } from 'react'
import { defaultLightingEquipmentImage } from './LightingEquipmentImage'
import type { LightingEquipment } from '../types/lightingEquipment'

export const defaultLightingEquipmentVideo = '/media/default-lighting-video.mp4'

export function LightingEquipmentVideo({ lightingEquipment }: { lightingEquipment: LightingEquipment }) {
  const [isLightingEquipmentVideoUnavailable, setIsLightingEquipmentVideoUnavailable] = useState(false)
  const useDefaultLightingEquipmentVideo = !lightingEquipment.videoUrl || isLightingEquipmentVideoUnavailable
  return <>
    <video className="lighting-equipment-feed-video"
      src={useDefaultLightingEquipmentVideo ? defaultLightingEquipmentVideo : lightingEquipment.videoUrl}
      poster={lightingEquipment.imageUrl || defaultLightingEquipmentImage}
      autoPlay loop muted playsInline preload="metadata"
      aria-label={`Видеопревью ${lightingEquipment.equipmentName}`}
      onError={() => setIsLightingEquipmentVideoUnavailable(true)} />
    {useDefaultLightingEquipmentVideo && <span className="lighting-equipment-video-caption">Демонстрационное видео</span>}
  </>
}
