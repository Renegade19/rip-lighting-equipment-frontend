import { Button, Form } from 'react-bootstrap'
import type { LightingEquipmentAttribute } from '../types/lightingEquipment'

export function LightingEquipmentAttributeList({ attributes = [] }: { attributes?: LightingEquipmentAttribute[] }) {
  return attributes.length ? <dl className="lighting-equipment-attributes">
    {attributes.map(attribute => <div key={attribute.attributeName}><dt>{attribute.attributeName}</dt><dd>{attribute.attributeValue}</dd></div>)}
  </dl> : <p>Дополнительные характеристики не указаны.</p>
}
export function LightingEquipmentAttributeEditor({ attributes, onChange }: {
  attributes: LightingEquipmentAttribute[]
  onChange: (attributes: LightingEquipmentAttribute[]) => void
}) {
  return <section className="lighting-equipment-attribute-editor" aria-label="Дополнительные характеристики">
    <h2>Дополнительные характеристики</h2>
    <p>Например: «Цоколь» — «E27» или «Цветовая температура, К» — «2700».</p>
    {attributes.map((attribute, index) => <div className="lighting-equipment-attribute-row" key={index}>
      <Form.Control aria-label={`Название характеристики ${index + 1}`} placeholder="Название характеристики" required maxLength={100} value={attribute.attributeName}
        onChange={event => onChange(attributes.map((row, i) => i === index ? { ...row, attributeName: event.target.value } : row))} />
      <Form.Control aria-label={`Значение характеристики ${index + 1}`} placeholder="Значение" required maxLength={500} value={attribute.attributeValue}
        onChange={event => onChange(attributes.map((row, i) => i === index ? { ...row, attributeValue: event.target.value } : row))} />
      <Button variant="outline-danger" type="button" aria-label={`Удалить характеристику ${index + 1}`} onClick={() => onChange(attributes.filter((_, i) => i !== index))}>Удалить</Button>
    </div>)}
    <Button variant="outline-secondary" type="button" disabled={attributes.length >= 50} onClick={() => onChange([...attributes, { attributeName: '', attributeValue: '' }])}>Добавить характеристику</Button>
  </section>
}
