export interface LightingEquipment {
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
