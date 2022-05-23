import { strictEqual } from 'assert';
import { expect } from 'chai';
import { yieldDefaultTime, yieldUpdateItem } from '../src/global'

describe('通用方法', () => {
  it('測試需要更新與內容', () => {
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

  it('測試不需要更新', () => {
    const params1 = [1, 2, 3];
    const params2 = [1, 2, 3];
    const actual = yieldUpdateItem(params1, params2)
    const expected = {
      "shouldUpdate": false
    }
    expect(expected).to.eql(actual)
  })

  it('測試預設時間格式', () => {
    const actual = yieldDefaultTime();
    // 處理時間處理上的格式
    const YYYY = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString();
    const MM = month.length > 1 ? month : month.padStart(2, '0');
    const day = new Date().getDate().toString();
    const DD = day.length > 1 ? day : day.padStart(2, '0');
    const expected = `${YYYY}-${MM}-${DD}`
    strictEqual(actual, expected);
  })
})