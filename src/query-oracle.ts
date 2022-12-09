import _ from "lodash";

/** 新增資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
export function insertQueryByOracle(tableName: string, params: object): any {
  const items = Object.keys(params);
  const columns = items.join(', ');
  const data = items.map(v => params[v]);
  const replacement = new Array(Object.keys(params).length).fill(':params').join(', ')
  const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${replacement})`

  return {
    sql,
    data
  }
}

/** 新增多筆資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
export function insertMultipleQueryByOracle(tableName: string, params: Array<object>): any {
  const columns = Object.keys(params[0]).join(', ');
  const replacement = new Array(Object.keys(params[0]).length).fill(':params').join(', ')
  let query = ''
  const data = params.map(v => {
    query += `INTO ${tableName} (${columns}) VALUES (${replacement}) `
    return Object.keys(v).map(x => v[x])
  });
  const sql = `INSERT ALL ${query}SELECT 1 FROM DUAL;`

  return {
    sql,
    data: _.flatten(data)
  }
}

/** 更新資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @param keys 主鍵名稱
 * @returns SQL 指令 與 注入資料
 */
export function updateQueryByOracle(tableName: string, params: object, keys: any): any {
  let columns: string;
  const items = Object.keys(params)
  const keyItems = Object.keys(keys)
  const key = keyItems.map((v: any) => `${v} = :params`).join(' AND ');
  if (items.length === 1) {
    columns = `${items[0]}=:params`;
  } else {
    columns = `${items.join('=:params, ')}=:params`;
  }
  const data = items.map((d: any) => params[d]);
  const keyData = keyItems.map((d: any) => keys[d]);
  const sql = `UPDATE ${tableName} SET ${columns} WHERE ${key}`
  return {
    sql,
    data: _.concat(data, keyData)
  }
}

/** 刪除資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
export function deleteQueryByOracle(tableName: string, key: string = 'id'): string {
  const sql = `DELETE FROM ${tableName} WHERE ${key} = :params`;
  return sql
}

/** 刪除資料的 SQL 指令 （使用複合鍵）
 * 
 * @param tableName 
 * @param keys 
 * @returns SQL 指令 與 注入資料
 */
export function deleteQueryWithMultipleKeyByOracle(tableName: string, keys: any) {
  const items = Object.keys(keys);
  const key = items.map((v: any) => `${v} = :params`).join(' AND ');
  const data = items.map((v: any) => keys[v]);
  const sql = `DELETE FROM ${tableName} WHERE ${key}`;
  return {
    sql,
    data
  }
}

/** 刪除多筆資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
export function deleteMultipleQueryByOracle(tableName: string, params: Array<string | number>, key: string = 'id'): string {
  const replacement = new Array(params.length).fill(':params').join(', ');
  const sql = `DELETE FROM ${tableName} WHERE ${key} IN (${replacement})`;
  return sql
}