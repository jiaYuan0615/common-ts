import { v4 as uuid } from 'uuid';

/** 新增資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
export function insertQuery(tableName: string, params: object): any {
  const columns = Object.keys(params).join(', ');
  const values = Object.keys(params).map((v) => params[v]);
  // First Item is P.K.
  const primaryKey = uuid();
  values.splice(0, 0, primaryKey);
  const replacement = new Array(Object.keys(params).length + 1).fill('?').join(', ')
  const sql = `INSERT INTO ${tableName} (id, ${columns}) VALUES (${replacement})`

  return {
    sql,
    values,
    primaryKey,
  }
}

/** 新增多筆資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
export function insertMultipleQuery(tableName: string, params: Array<object>): any {
  const columns = Object.keys(params[0]).join(', ');
  const values = []
  const primaryKeys = []

  const replacement = params.map(o => {
    const primaryKey = uuid();
    values.push(primaryKey);
    primaryKeys.push(primaryKey);
    Object.keys(o).map(v => values.push(o[v]))
    return `(${new Array(Object.keys(o).length + 1).fill('?').join(', ')})`
  })

  const sql = `INSERT INTO ${tableName} (id, ${columns}) VALUES ${replacement.join(', ')}`
  return {
    primaryKeys,
    sql,
    values
  }
}

/** 更新資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @param id 主鍵值
 * @param key 主鍵名稱
 * @returns SQL 指令 與 注入資料
 */
export function updateQuery(tableName: string, params: object, id: string, key: string = 'id'): any {
  let columns: string;
  if (Object.keys(params).length === 1) {
    columns = `${Object.keys(params)[0]}=?`;
  } else {
    columns = `${Object.keys(params).join('=?, ')}=?`;
  }

  const values = Object.keys(params).map(v => params[v]);
  // Final Key is P.K.
  values.push(id);
  const sql = `UPDATE ${tableName} SET ${columns} WHERE ${key} = ?`
  return {
    sql,
    values
  }
}

/** 刪除資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
export function deleteQuery(tableName: string, key: string = 'id'): string {
  const sql = `DELETE FROM ${tableName} WHERE ${key} = ?`;
  return sql
}

/** 刪除多筆資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
export function deleteMultipleQuery(tableName: string, params: Array<string | number>, key: string = 'id'): string {
  const replacement = new Array(params.length).fill('?').join(', ');
  const sql = `DELETE FROM ${tableName} WHERE ${key} IN (${replacement})`;
  return sql
}