import { expect } from 'chai';
import { yieldUpdateItem } from '../src/global'

describe('通用方法', () => {
  it('回傳是否更新與更新項目', () => {
    const params1 = [1, 2, 3];
    const params2 = [2, 3, 4];
    const actual = yieldUpdateItem(params1, params2)
    const expected = {
      "insertItem": [4],
      "deleteItem": [1],
      "shouldUpdate": true
    }
    expect(expected).to.eql(actual)
  })
})