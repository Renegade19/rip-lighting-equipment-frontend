import { test } from 'node:test'
import assert from 'node:assert/strict'
import { lightingEquipmentMock } from '../src/mocks/lightingEquipmentMock.ts'
import { defaultLightingEquipmentPowerFilter, filterLightingEquipment, getLightingEquipmentById, getNextLightingEquipment } from '../src/modules/lightingEquipmentRepository.ts'

test('гость получает только опубликованные светильники', () => {
  assert.deepEqual(filterLightingEquipment(lightingEquipmentMock, defaultLightingEquipmentPowerFilter).map((item) => item.equipmentId), [1, 2, 3, 4, 7])
  assert.equal(getLightingEquipmentById('5'), undefined)
  assert.equal(getLightingEquipmentById('6'), undefined)
})
test('границы мощности включены, перевёрнутый диапазон нормализуется', () => {
  const expected = [1, 4]
  assert.deepEqual(filterLightingEquipment(lightingEquipmentMock, { minPowerWatt: 4.8, maxPowerWatt: 4.8 }).map((item) => item.equipmentId), expected)
  assert.deepEqual(filterLightingEquipment(lightingEquipmentMock, { minPowerWatt: 5, maxPowerWatt: 4.5 }).map((item) => item.equipmentId), expected)
  assert.deepEqual(filterLightingEquipment(lightingEquipmentMock, { minPowerWatt: 9, maxPowerWatt: 10 }), [])
})
test('Далее следует порядку отфильтрованных карточек, а не id + 1', () => {
  const filtered = filterLightingEquipment(lightingEquipmentMock, { minPowerWatt: 4.5, maxPowerWatt: 10 })
  assert.equal(getNextLightingEquipment(filtered, 1)?.equipmentId, 4)
  assert.equal(getNextLightingEquipment(filtered, 4)?.equipmentId, 7)
  assert.equal(getNextLightingEquipment(filtered, 7), undefined)
  assert.equal(getNextLightingEquipment(filtered, 999), undefined)
})
test('прямая ссылка принимает только существующий опубликованный id', () => {
  assert.equal(getLightingEquipmentById('7')?.equipmentId, 7)
  for (const id of ['0', '-1', '01', '1.5', '999', 'abc', '9007199254740993', undefined]) assert.equal(getLightingEquipmentById(id), undefined)
})
