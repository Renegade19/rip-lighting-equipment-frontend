export interface LightingEquipmentAttribute { attributeId?: number; attributeName: string; attributeValue: string }
export interface LightingEquipment {
  attributes?: LightingEquipmentAttribute[]
  equipmentId: number
  equipmentName: string
  shortDescription: string
  equipmentStatus: 'черновик' | 'опубликован' | 'удалён'
  imageUrl: string
  videoUrl: string
  powerWatt: number
  beamAngleDeg: number
  likedUserIds: readonly number[]
}

export interface LightingEquipmentPowerFilter {
  minPowerWatt: number
  maxPowerWatt: number
}
