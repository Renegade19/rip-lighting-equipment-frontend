type LightingEquipmentIconName = 'feed' | 'add' | 'tiles' | 'login' | 'like' | 'next'
const lightingEquipmentIconPaths: Record<LightingEquipmentIconName, string> = {
  feed: 'M3 5h12v14H3z M15 10l6-4v12l-6-4z',
  add: 'M12 4v16M4 12h16',
  tiles: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  login: 'M14 3h6v18h-6M3 12h13M11 7l5 5-5 5',
  like: 'M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6z',
  next: 'M5 12h14M13 6l6 6-6 6',
}
export function LightingEquipmentIcon({ name }: { name: LightingEquipmentIconName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={lightingEquipmentIconPaths[name]} /></svg>
}
