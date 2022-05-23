import _ from 'lodash';
import moment from 'moment';

export function yieldUpdateItem(origin: Array<string | number>, update: Array<string | number>): object {
  const preserveItems = _.xor(origin, update);
  const payload = { "shouldUpdate": false, }
  if (preserveItems.length) {
    payload["insertItem"] = _.intersection(preserveItems, update);
    payload["deleteItem"] = _.intersection(preserveItems, origin);
    payload["shouldUpdate"] = true
  }
  return payload
}

/** 回傳預設的時間
 * 
 */
export function yieldDefaultTime(): string {
  return moment().format('YYYY-MM-DD');
}