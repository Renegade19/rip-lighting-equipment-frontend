import { Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LightingEquipmentIcon } from './LightingEquipmentIcon'

export function LightingEquipmentNavigation() {
  return <Navbar as="nav" className="lighting-equipment-navigation" aria-label="Разделы LumiCalc">
    <Nav>
      <Nav.Link as={NavLink} to="/lighting-equipment/feed">
        <LightingEquipmentIcon name="feed" /><span>Лента</span>
      </Nav.Link>
      <Nav.Link as="button" type="button" disabled aria-disabled="true" title="Добавление будет доступно после авторизации в ЛР6">
        <LightingEquipmentIcon name="add" /><span>Добавление</span>
      </Nav.Link>
      <Nav.Link as={NavLink} to="/lighting-equipment" end>
        <LightingEquipmentIcon name="tiles" /><span>Плитка</span>
      </Nav.Link>
      <Nav.Link as="button" type="button" disabled aria-disabled="true" title="Авторизация появится в ЛР6">
        <LightingEquipmentIcon name="login" /><span>Вход</span>
      </Nav.Link>
    </Nav>
  </Navbar>
}
